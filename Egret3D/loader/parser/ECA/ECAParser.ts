﻿module egret3d {

    /**
     * @private 
     * @language zh_CN
     * @class egret3d.ECAParser
     * @classdesc
     * 用 EAMParser 类 解析.eca 文件
     */
    export class ECAParser {

        /**
         * @language zh_CN
         * @param datas 加载的二进制流
         * @returns CameraAnimationController
         */
        public static parse(datas: ArrayBuffer): CameraAnimationController {
            var bytes: ByteArray = new ByteArray(datas);
            var fileFormat: string = bytes.readUTF();
            var version: number = bytes.readUnsignedInt();
            return ECAVersion.versionDictionary[version](bytes);
        }
    }
}