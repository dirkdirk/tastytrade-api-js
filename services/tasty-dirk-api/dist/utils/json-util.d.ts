import _ from 'lodash';
export declare type BasicJsonValue = boolean | number | string | null | undefined;
export declare type JsonValue = BasicJsonValue | JsonArray | JsonMap;
export interface JsonMap {
    [key: string]: JsonValue | undefined;
}
export declare type JsonArray = JsonValue[];
export declare class JsonBuilder {
    readonly json: JsonMap;
    constructor(json?: JsonMap);
    add(key: string, value: JsonValue, serializeEmpty?: boolean): this;
}
export declare function recursiveDasherizeKeys(body: any): _.Dictionary<any>;
export declare function dasherize(target: string): string;
