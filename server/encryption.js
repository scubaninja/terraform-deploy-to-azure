// If running in nodejs we need to bootstrap some stuff. 
// This checks for node and does the bootstrapping...
if (Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]') {
    const crypto = require('@trust/webcrypto')
    window = {}
    window.crypto = crypto;

    function btoa(str) {
        var buffer;

        if (str instanceof Buffer) {
            buffer = str;
        } else {
            buffer = Buffer.from(str.toString(), 'binary');
        }

        return buffer.toString('base64');
    }

    function atob(str) {
        return Buffer.from(str, 'base64').toString('binary');
    }

    // Import the keys from OS vars
    keys = {}
    window.crypto.subtle.importKey(
        "raw", //can be "jwk" or "raw"
        arrayFromBase64(process.env.AES_KEY),
        {   //this is the algorithm options
            name: "AES-CTR",
        },
        false, //whether the key is extractable (i.e. can be used in exportKey)
        ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    ).then((k) => {
        keys.aesKey = k;
    }).catch(function(err){
        console.error(err);
    });

    window.crypto.subtle.importKey(
        "raw", //can be "jwk" or "raw"
        arrayFromBase64(process.env.HMAC_KEY),
        {   //this is the algorithm options
            name: "HMAC",
            hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
            //length: 256, //optional, if you want your key length to differ from the hash function's block length
        },
        false, //whether the key is extractable (i.e. can be used in exportKey)
        ["sign", "verify"] //can be any combination of "sign" and "verify"
    )
    .then((k) => {
        keys.hmacKey = k
    }).catch(function(err){
        console.error(err);
    });

} else {

    // Generate a set of keys 
    generateKeys().then(k => {
        keys = k;
        keysExist = true;
    });
}

var encoding = 'utf-8'

generateKeys().then(async keys => {
    console.log(keys);

    let stringData = "Test data";

    result = await encryptAndSign(stringData, keys);
    console.log(result);
   

    newResult = await validateAndDecrypt(result, keys);
    console.log(newResult);
}).catch(e => {
    console.log(e);
});

async function encryptAndSign(message, keys) {
    let data = new TextEncoder(encoding).encode(message);

    let encrypted = await encryptBody(data, keys.aesKey);
    let signature = await signHMAC(encrypted.ivAndBody, keys.hmacKey);
    
    return {
        body: encrypted.body,
        iv: encrypted.iv,
        sig: signature
    }
}

async function validateAndDecrypt(message, keys) {
    const ivAndBody = appendBuffer(arrayFromBase64(message.body), arrayFromBase64(message.iv));
    if (!validateHMAC(message.sig, ivAndBody, keys.hmacKey)) {
        return {
            isValid: false
        }
    }
    let decrypted = await decryptBody(message.body, keys.aesKey, message.iv);

    return {
        isValid: true, 
        message: new TextDecoder(encoding).decode(decrypted)
    }
}

// Simple function to encrypt a message body
async function encryptBody(data, key) {
    var iv = new Uint8Array(16);
    window.crypto.getRandomValues(iv);

    let encrypted = await window.crypto.subtle.encrypt(
        {
            name: "AES-CTR",
            //Don't re-use counters!
            //Always use a new counter every time your encrypt!
            counter: iv,
            length: 128, //can be 1-128
        },
        key, //from generateKey or importKey above
        data //ArrayBuffer of data you want to encrypt
    )

    console.log(encrypted)

    return {
        body: base64FromArray(encrypted),
        iv: base64FromArray(iv),
        ivAndBody: base64FromArray(appendBuffer(encrypted, iv))
    }
}

async function decryptBody(data, key, iv) {

    return await window.crypto.subtle.decrypt(
        {
            name: "AES-CTR",
            counter: arrayFromBase64(iv),
            length: 128,
        },
        key, //from generateKey or importKey above
        arrayFromBase64(data) //ArrayBuffer of the data
    )
}

async function signHMAC(data, key) {
    return base64FromArray(await window.crypto.subtle.sign(
        {
            name: "HMAC",
        },
        key, //from generateKey or importKey above
        arrayFromBase64(data) //ArrayBuffer of data you want to sign
    ))
}

async function validateHMAC(signature, data, key) {
    return await window.crypto.subtle.verify(
        {
            name: "HMAC",
        },
        key, //from generateKey or importKey above
        arrayFromBase64(signature), //ArrayBuffer of the signature
        arrayFromBase64(data) //ArrayBuffer of the data
    )
}

async function generateKeys() {
    var hmacKey = await window.crypto.subtle.generateKey(
        {
            name: "HMAC",
            hash: { name: "SHA-256" }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
            //length: 256, //optional, if you want your key length to differ from the hash function's block length
        },
        true, //whether the key is extractable (i.e. can be used in exportKey)
        ["sign", "verify"] //can be any combination of "sign" and "verify"
    );

    var hmacKeyExport = await window.crypto.subtle.exportKey(
        "raw", //can be "jwk" or "raw"
        hmacKey //extractable must be true
    )

    var aesKey = await window.crypto.subtle.generateKey(
        {
            name: "AES-CTR",
            length: 256, //can be  128, 192, or 256
        },
        true, //whether the key is extractable (i.e. can be used in exportKey)
        ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    );

    var aesKeyExport = await window.crypto.subtle.exportKey(
        "raw", //can be "jwk" or "raw"
        aesKey //extractable must be true
    )

    return {
        hmacKey: hmacKey,
        hmacKeyExport: base64FromArray(hmacKeyExport),
        aesKey: aesKey,
        aesKeyExport: base64FromArray(aesKeyExport),
    }
}



// Base64 encode
function base64FromArray(buff) {
    return btoa(new Uint8Array(buff).reduce((s, b) => s + String.fromCharCode(b), ''));
}

function arrayFromBase64(base64) {
    var binary_string = atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
}

function appendBuffer( buffer1, buffer2 ) {
    var tmp = new Uint8Array( buffer1.byteLength + buffer2.byteLength );
    tmp.set( new Uint8Array( buffer1 ), 0 );
    tmp.set( new Uint8Array( buffer2 ), buffer1.byteLength );
    return tmp.buffer;
}