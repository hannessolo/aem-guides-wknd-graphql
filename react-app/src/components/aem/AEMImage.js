import { EditableComponent, MapTo } from '@adobe/aem-react-editable-components';

import './AEMImage.scss';
import React from 'react'
import {RoutedLink} from "./RoutedLink";

const RESOURCE_TYPE = "wknd-app/components/image";

const ImageV2IsEmptyFn = (props) => (!props.src) || props.src.trim().length === 0

const ImageV2InnerContents = (props) => {
    return (
      <>
          <img src={props.src}
               className={props.baseCssClass + '__image'}
               alt={props.alt}/>
          {
            !!(props.title) && <span className={props.baseCssClass + '__title'} itemProp="caption">{props.title}</span>
          }
          {
            props.displayPopupTitle && (!!props.title) && <meta itemProp="caption" content={props.title}/>
          }
      </>
    );
};

const ImageV2Contents = (props) => {
    if( props.link && props.link.trim().length > 0){
        return (
          <RoutedLink className={props.baseCssClass + '__link'} isRouted={props.routed} to={props.link}>
              <ImageV2InnerContents {...props}/>
          </RoutedLink>
        )
    }
    return <ImageV2InnerContents {...props}/>
};

const ImageV2Impl = (props) => {
    if (!props.baseCssClass) {
      props.baseCssClass = 'cmp-image'
    }

    const {isInEditor = false} = props;
    const cssClassName = (isInEditor) ? props.baseCssClass + ' cq-dd-image' : props.baseCssClass;

    return (
      <div className={cssClassName}>
          <ImageV2Contents {...props}/>
      </div>
    )

};

const ImageV2 = ImageV2Impl


const EditConfig = {
    emptyLabel: "Image",
    isEmpty: ImageV2IsEmptyFn,
    resourceType: RESOURCE_TYPE
};

const AEMImage = (props) => <EditableComponent config={EditConfig} {...props}><ImageV2 {...props} /></EditableComponent>

MapTo(RESOURCE_TYPE)(ImageV2);

export default AEMImage;
