﻿module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.Bound
     * @classdesc
     * 可使用 Bound 类 取得包围盒的数据。</p>
     * 包含包围盒的各顶点信息，当包围盒要进行世界变换时，应当变换各顶点信息。</p>
     * @see egret3d.Bound
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class BoundBox extends Bound {
        
        /**
        * @language zh_CN
        * 顶点数据
        */
        public vexData: Array<number> = new Array<number>();
                        
        /**
        * @language zh_CN
        * 索引数据
        */
        public indexData: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * 顶点长度
        */
        public vexLength: number = 3;
        /**
        * @language zh_CN
        * 盒子最小点
        */
        public min: Vector3D = new Vector3D();
                
        /**
        * @language zh_CN
        * 盒子最大点
        */
        public max: Vector3D = new Vector3D();
             
        /**
        * @language zh_CN
        * 盒子宽
        */
        public width: number = 0;
                                
        /**
        * @language zh_CN
        * 盒子高
        */
        public heigth: number = 0;

        /**
        * @language zh_CN
        * 盒子长
        */
        public depth: number = 0;

        /**
        * @language zh_CN
        * 盒子体积
        */
        public volume: number = 0;
        
        /**
        * @language zh_CN
        * 盒子包围球中心点
        */
        public center: Vector3D = new Vector3D();
                
        /**
        * @language zh_CN
        * 盒子包围球半径
        */
        public radius: number = 0;

        /**
        * @language zh_CN
        * constructor
        * @param min
        * @param max
        */
        constructor(min: Vector3D = new Vector3D(), max: Vector3D = new Vector3D()) {
            super();
            this.min.copyFrom(min);
            this.max.copyFrom(max);
            this.calculateBox();
        }
        
        /**
        * @language zh_CN
        * 拷贝一个包围盒
        * @param box 
        */
        public copyFrom(box: BoundBox) {
            this.min.copyFrom(box.min);
            this.max.copyFrom(box.max);
            this.calculateBox();
        }
                
        /**
        * @language zh_CN
        * 填充当前包围盒
        * @param box 
        */
        public fillBox(min: Vector3D, max: Vector3D) {
            this.min.copyFrom(min);
            this.max.copyFrom(max);
            this.calculateBox();
        }
                
        /**
        * @language zh_CN
        * 检测一个点是否包围盒内
        * @param pos 检测的点
        * @returns 成功返回true
        */
        public inBox(pos: Vector3D): boolean {
            if (pos.x <= this.max.x && pos.x >= this.min.x &&
                pos.y <= this.max.y && pos.y >= this.min.y &&
                pos.z <= this.max.z && pos.z >= this.min.z) {
                return true;
            }
            return false;
        }
                        
        /**
        * @language zh_CN
        * 检测两个包围盒是否相交
        * @param box2 其中一个包围盒 
        * @param boxIntersect 相交的包围盒
        * @returns 成功返回true
        */
        public intersectAABBs(box2: BoundBox, boxIntersect: BoundBox): boolean {
            if (this.min.x > box2.max.x) {
                return false;
            }

            if (this.max.x < box2.min.x) {
                return false;
            }

            if (this.min.y > box2.max.y) {
                return false;
            }

            if (this.max.y < box2.min.y) {
                return false;
            }

            if (this.min.z > box2.max.z) {
                return false;
            }

            if (this.max.z < box2.min.z) {
                return false;
            }

            if (boxIntersect != null) {
                boxIntersect.min.x = Math.max(this.min.x, box2.min.x);
                boxIntersect.max.x = Math.min(this.max.x, box2.max.x);
                boxIntersect.min.y = Math.max(this.min.y, box2.min.y);
                boxIntersect.max.y = Math.min(this.max.y, box2.max.y);
                boxIntersect.min.z = Math.max(this.min.z, box2.min.z);
                boxIntersect.max.z = Math.min(this.max.z, box2.max.z);
            }
            return true;
        }
                                                                       
        /**
        * @language zh_CN
        * 以字符串形式返回box的值
        * @returns 字符串
        */
        public toString(): string {
            return "CubeBoxBound [min:(" + this.min.x + ", " + this.min.y + ", " + this.min.z + ") max:(" + this.max.x + ", " + this.max.y + ", " + this.max.z + ")]";
        }
                                        
        /**
        * @language zh_CN
        * 计算包围盒数据
        */
        public calculateBox() {
            this.vexData.length = 0;
            this.indexData.length = 0;

            var sub: Vector3D = this.max.subtract(this.min);

            this.vexData.push(this.min.x);
            this.vexData.push(this.min.y);
            this.vexData.push(this.min.z);

            this.vexData.push(this.min.x);
            this.vexData.push(this.min.y);
            this.vexData.push(this.min.z + sub.z);

            this.vexData.push(this.min.x + sub.x);
            this.vexData.push(this.min.y);
            this.vexData.push(this.min.z + sub.z);

            this.vexData.push(this.min.x + sub.x);
            this.vexData.push(this.min.y);
            this.vexData.push(this.min.z);

            this.vexData.push(this.max.x - sub.x);
            this.vexData.push(this.max.y);
            this.vexData.push(this.max.z - sub.z);


            this.vexData.push(this.max.x - sub.x);
            this.vexData.push(this.max.y);
            this.vexData.push(this.max.z);

            this.vexData.push(this.max.x);
            this.vexData.push(this.max.y);
            this.vexData.push(this.max.z);

            this.vexData.push(this.max.x);
            this.vexData.push(this.max.y);
            this.vexData.push(this.max.z - sub.z);

            this.indexData.push(
                0, 4, 7, 0, 7, 3,
                2, 6, 5, 2, 5, 1,
                4, 5, 6, 4, 6, 7,
                0, 3, 2, 0, 2, 1,
                0, 1, 5, 0, 5, 4,
                3, 7, 6, 3, 6, 2
            );

            this.width = this.max.x - this.min.x;
            this.heigth = this.max.y - this.min.y;
            this.depth = this.max.z - this.min.z;
            this.volume = this.width * this.heigth * this.depth;

            var c: Vector3D = this.max.subtract(this.min);
            c.scaleBy(0.5);

            this.radius = c.length;
            this.center.copyFrom(this.min);
            var tmp: Vector3D = this.center.add(c);
            this.center.copyFrom(tmp);
        }

        /**
        * @language zh_CN
        * 检测一个盒子是否在视椎体内
        * @param frustum 视椎体
        * @returns 在视椎内返回ture
        * @version Egret 3.0
        * @platform Web,Native
        */
        public inBound(frustum: Frustum): boolean {
            return frustum.inBox(this);
        }
    }
}