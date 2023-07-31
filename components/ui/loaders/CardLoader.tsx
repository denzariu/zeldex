import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"
import { colors } from "../../../styles/defaults"

const CardLoader = (props: any) => (
  <ContentLoader 
    speed={2}
    width={388} //412 - 24
    height={219 + 12}
    //viewBox="0 0 100% 146"
    backgroundColor={colors.grayLight}
    foregroundColor={colors.primaryLight}
    //style={{ marginHorizontal: 24 }}
    {...props}
   
  >
    {/* <Circle cx="31" cy="31" r="15" />  */}
    {/* <Rect x="58" y="18" rx="2" ry="2" width="140" height="10" />  */}
    {/* <Rect x="58" y="34" rx="2" ry="2" width="140" height="10" />  */}
    <Rect x="24" y="0" rx="8" ry="8" width="364" height="164" />
    <Rect x="24" y="172" rx="8" ry="8" width="310" height="24" />
    <Rect x="338" y="172" rx="8" ry="8" width="50" height="24" />
    <Rect x="24" y="204" rx="8" ry="8" width="75" height="18" />
  </ContentLoader>
)

export default CardLoader