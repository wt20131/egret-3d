﻿attribute vec3 attribute_normal;
attribute vec4 attribute_color;

varying vec3 varying_ViewDir ;
uniform mat4 uniform_NormalMatrix;
void main(void){
    
   mat4 modeViewMatrix = uniform_ViewMatrix * uniform_ModelMatrix; 
   mat3 normalMatrix = mat3(uniform_NormalMatrix);//transpose( inverse(mat3( modeViewMatrix )) ); 
   varying_eyeNormal = normalize(normalMatrix * -attribute_normal); 
   varying_ViewDir = normalize(normalMatrix * (uniform_eyepos.xyz - e_position)) ; 
   
   outPosition = uniform_ViewMatrix * uniform_ModelMatrix * vec4(e_position, 1.0) ; 
   varying_ViewPose = outPosition.xyzw;
   
   varying_color = attribute_color;
}

