import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"
import { colors } from "../../../styles/defaults"

const MiniCardLoader = (props: any) => (
  <ContentLoader 
    speed={2}
    width={200} //216 - 24
    height={126 + 12+24}
    //viewBox="0 0 100% 146"
    backgroundColor={colors.grayLight}
    foregroundColor={colors.primaryLight}
    style={{ marginHorizontal: 8 }}
    {...props}
   
  >
    
    <Rect x="0" y="0" rx="8" ry="8" width="200" height="108" />
    <Rect x="0" y="116" rx="6" ry="6" width="158" height="16" />
    <Rect x="162" y="116" rx="6" ry="6" width="38" height="16" />
    <Rect x="0" y="136" rx="6" ry="6" width="75" height="16" /> 
    {/* <Rect x="0" y="172" rx="8" ry="8" width="216" height="24" />
    <Rect x="338" y="172" rx="8" ry="8" width="50" height="24" />
    <Rect x="0" y="204" rx="8" ry="8" width="75" height="18" /> */}
  </ContentLoader>
)

export default MiniCardLoader