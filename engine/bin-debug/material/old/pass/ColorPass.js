var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    */
    var ColorPass = (function (_super) {
        __extends(ColorPass, _super);
        function ColorPass(materialData) {
            var _this = _super.call(this, materialData) || this;
            _this._passID = egret3d.PassType.colorPass;
            return _this;
        }
        /**
       * @language zh_CN
       * @private
       * 初始化 UseMethod。
       * @version Egret 3.0
       * @platform Web,Native
       */
        ColorPass.prototype.initUseMethod = function (animation, geom) {
            var i = 0;
            this._passChange = false;
            this._passUsage = new egret3d.PassUsage();
            this._passUsage.vertexShader.shaderType = egret3d.ShaderType.VertexShader;
            this._passUsage.fragmentShader.shaderType = egret3d.ShaderType.FragmentShader;
            //pre Phase ---------------------------------------------------
            if (animation) {
                // to add accept animation shader
                if (animation.skeletonAnimationController) {
                    this._passUsage.maxBone = animation.skeletonAnimationController.jointNum * 2;
                    this._vs_shader_methods[egret3d.ShaderPhaseType.start_vertex] = [];
                    this._vs_shader_methods[egret3d.ShaderPhaseType.start_vertex].push("skeleton_vs");
                }
                else if (animation.particleAnimationController) {
                    this._vs_shader_methods[egret3d.ShaderPhaseType.start_vertex] = [];
                    this._vs_shader_methods[egret3d.ShaderPhaseType.start_vertex].push("particle_vs");
                    //to change importent
                    this.addShaderPhase(this._passID, animation.particleAnimationController.particleAnimationState.vertex_shaders, this._vs_shader_methods);
                    this.addShaderPhase(this._passID, animation.particleAnimationController.particleAnimationState.fragment_shaders, this._fs_shader_methods);
                }
            }
            if (this._materialData.shaderPhaseTypes[egret3d.PassType.diffusePass].indexOf(egret3d.ShaderPhaseType.diffuse_fragment) != -1) {
                this._fs_shader_methods[egret3d.ShaderPhaseType.diffuse_fragment] = [];
                this._fs_shader_methods[egret3d.ShaderPhaseType.diffuse_fragment].push("diffuse_fragment");
            }
            this._fs_shader_methods[egret3d.ShaderPhaseType.end_fragment] = this._fs_shader_methods[egret3d.ShaderPhaseType.end_fragment] || [];
            this._fs_shader_methods[egret3d.ShaderPhaseType.end_fragment].push("colorPassEnd_fs");
            this.phaseEnd(animation);
        };
        return ColorPass;
    }(egret3d.MaterialPass));
    egret3d.ColorPass = ColorPass;
    __reflect(ColorPass.prototype, "egret3d.ColorPass");
})(egret3d || (egret3d = {}));