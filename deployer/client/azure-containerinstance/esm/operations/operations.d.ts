import * as msRest from "ms-rest-js";
import * as Models from "../models";
import { ContainerInstanceManagementClientContext } from "../containerInstanceManagementClientContext";
/** Class representing a Operations. */
export declare class Operations {
    private readonly client;
    /**
     * Create a Operations.
     * @param {ContainerInstanceManagementClientContext} client Reference to the service client.
     */
    constructor(client: ContainerInstanceManagementClientContext);
    /**
     * List the operations for Azure Container Instance service.
     * @param [options] The optional parameters
     * @returns Promise<Models.OperationsListResponse>
     */
    list(options?: msRest.RequestOptionsBase): Promise<Models.OperationsListResponse>;
    /**
     * @param callback The callback
     */
    list(callback: msRest.ServiceCallback<Models.OperationListResult>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    list(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationListResult>): void;
}
//# sourceMappingURL=operations.d.ts.map