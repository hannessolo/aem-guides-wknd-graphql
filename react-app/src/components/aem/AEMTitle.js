 // Import the withMappable API provided bu the AEM SPA Editor JS SDK
 import { EditableComponent, MapTo } from '@adobe/aem-react-editable-components';
 import React from 'react'
 import {RoutedLink} from "./RoutedLink";

 // Import the AEM React Core Components' Title component implementation and it's Empty Function
 // import { TitleV2, TitleV2IsEmptyFn } from "@adobe/aem-core-components-react-base";

 // The sling:resourceType for which this Core Component is registered with in AEM
 const RESOURCE_TYPE = "wknd-app/components/title";

 export const TitleV2Link = (props) => {
   return (
     <RoutedLink className={props.baseCssClass + (props.nested ? '-' : '__') +  'link'} isRouted={props.routed} to={props.linkURL}>
       {props.text}
     </RoutedLink>
   );
 };

 export const TitleV2Contents = (props) => {
   if( !props.linkDisabled){
     return <TitleV2Link {...props}/>
   }

   return <>{props.text}</>
 };

 const Title = (props) => {
   if (!props.baseCssClass) {
     props.baseCssClass = 'cmp-title'
   }

   const elementType = (!!props.type) ? props.type.toString() : 'h3';
   return (
     <div className={props.baseCssClass}>
       {
         React.createElement(elementType,
           {
             className: props.baseCssClass + (props.nested ? '-' : '__') + 'text',
           },
           <TitleV2Contents {...props}/>
         )
       }

     </div>
   )
 }

 // Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
 const EditConfig = {
     emptyLabel: "Title",  // The component placeholder in AEM SPA Editor
     isEmpty: (props) => props.text == null || props.text.trim().length === 0, // The function to determine if this component has been authored
     resourceType: RESOURCE_TYPE // The sling:resourceType this component is mapped to
 };

 // allows the component to be hardcoded into the SPA; <AEMTitle .../>
const AEMTitle = (props) => <EditableComponent config={EditConfig} {...props}><Title /></EditableComponent>

 // MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
 MapTo(RESOURCE_TYPE)(AEMTitle);

export default AEMTitle
