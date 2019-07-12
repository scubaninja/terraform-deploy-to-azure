/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */
import * as msRest from "ms-rest-js";
import * as Mappers from "../models/deploymentOperationsMappers";
import * as Parameters from "../models/parameters";
/** Class representing a DeploymentOperations. */
var DeploymentOperations = /** @class */ (function () {
    /**
     * Create a DeploymentOperations.
     * @param {ResourceManagementClientContext} client Reference to the service client.
     */
    function DeploymentOperations(client) {
        this.client = client;
    }
    DeploymentOperations.prototype.getAtSubscriptionScope = function (deploymentName, operationId, options, callback) {
        return this.client.sendOperationRequest({
            deploymentName: deploymentName,
            operationId: operationId,
            options: options
        }, getAtSubscriptionScopeOperationSpec, callback);
    };
    DeploymentOperations.prototype.listAtSubscriptionScope = function (deploymentName, options, callback) {
        return this.client.sendOperationRequest({
            deploymentName: deploymentName,
            options: options
        }, listAtSubscriptionScopeOperationSpec, callback);
    };
    DeploymentOperations.prototype.get = function (resourceGroupName, deploymentName, operationId, options, callback) {
        return this.client.sendOperationRequest({
            resourceGroupName: resourceGroupName,
            deploymentName: deploymentName,
            operationId: operationId,
            options: options
        }, getOperationSpec, callback);
    };
    DeploymentOperations.prototype.list = function (resourceGroupName, deploymentName, options, callback) {
        return this.client.sendOperationRequest({
            resourceGroupName: resourceGroupName,
            deploymentName: deploymentName,
            options: options
        }, listOperationSpec, callback);
    };
    DeploymentOperations.prototype.listAtSubscriptionScopeNext = function (nextPageLink, options, callback) {
        return this.client.sendOperationRequest({
            nextPageLink: nextPageLink,
            options: options
        }, listAtSubscriptionScopeNextOperationSpec, callback);
    };
    DeploymentOperations.prototype.listNext = function (nextPageLink, options, callback) {
        return this.client.sendOperationRequest({
            nextPageLink: nextPageLink,
            options: options
        }, listNextOperationSpec, callback);
    };
    return DeploymentOperations;
}());
export { DeploymentOperations };
// Operation Specifications
var serializer = new msRest.Serializer(Mappers);
var getAtSubscriptionScopeOperationSpec = {
    httpMethod: "GET",
    path: "subscriptions/{subscriptionId}/providers/Microsoft.Resources/deployments/{deploymentName}/operations/{operationId}",
    urlParameters: [
        Parameters.deploymentName,
        Parameters.operationId,
        Parameters.subscriptionId
    ],
    queryParameters: [
        Parameters.apiVersion
    ],
    headerParameters: [
        Parameters.acceptLanguage
    ],
    responses: {
        200: {
            bodyMapper: Mappers.DeploymentOperation
        },
        default: {
            bodyMapper: Mappers.CloudError
        }
    },
    serializer: serializer
};
var listAtSubscriptionScopeOperationSpec = {
    httpMethod: "GET",
    path: "subscriptions/{subscriptionId}/providers/Microsoft.Resources/deployments/{deploymentName}/operations",
    urlParameters: [
        Parameters.deploymentName,
        Parameters.subscriptionId
    ],
    queryParameters: [
        Parameters.top,
        Parameters.apiVersion
    ],
    headerParameters: [
        Parameters.acceptLanguage
    ],
    responses: {
        200: {
            bodyMapper: Mappers.DeploymentOperationsListResult
        },
        default: {
            bodyMapper: Mappers.CloudError
        }
    },
    serializer: serializer
};
var getOperationSpec = {
    httpMethod: "GET",
    path: "subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/deployments/{deploymentName}/operations/{operationId}",
    urlParameters: [
        Parameters.resourceGroupName,
        Parameters.deploymentName,
        Parameters.operationId,
        Parameters.subscriptionId
    ],
    queryParameters: [
        Parameters.apiVersion
    ],
    headerParameters: [
        Parameters.acceptLanguage
    ],
    responses: {
        200: {
            bodyMapper: Mappers.DeploymentOperation
        },
        default: {
            bodyMapper: Mappers.CloudError
        }
    },
    serializer: serializer
};
var listOperationSpec = {
    httpMethod: "GET",
    path: "subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/deployments/{deploymentName}/operations",
    urlParameters: [
        Parameters.resourceGroupName,
        Parameters.deploymentName,
        Parameters.subscriptionId
    ],
    queryParameters: [
        Parameters.top,
        Parameters.apiVersion
    ],
    headerParameters: [
        Parameters.acceptLanguage
    ],
    responses: {
        200: {
            bodyMapper: Mappers.DeploymentOperationsListResult
        },
        default: {
            bodyMapper: Mappers.CloudError
        }
    },
    serializer: serializer
};
var listAtSubscriptionScopeNextOperationSpec = {
    httpMethod: "GET",
    baseUrl: "https://management.azure.com",
    path: "{nextLink}",
    urlParameters: [
        Parameters.nextPageLink
    ],
    headerParameters: [
        Parameters.acceptLanguage
    ],
    responses: {
        200: {
            bodyMapper: Mappers.DeploymentOperationsListResult
        },
        default: {
            bodyMapper: Mappers.CloudError
        }
    },
    serializer: serializer
};
var listNextOperationSpec = {
    httpMethod: "GET",
    baseUrl: "https://management.azure.com",
    path: "{nextLink}",
    urlParameters: [
        Parameters.nextPageLink
    ],
    headerParameters: [
        Parameters.acceptLanguage
    ],
    responses: {
        200: {
            bodyMapper: Mappers.DeploymentOperationsListResult
        },
        default: {
            bodyMapper: Mappers.CloudError
        }
    },
    serializer: serializer
};
//# sourceMappingURL=deploymentOperations.js.map