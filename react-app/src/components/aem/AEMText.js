import { withMappable, MapTo } from '@adobe/aem-react-editable-components';
// import { TextV2, TextV2IsEmptyFn } from "@adobe/aem-core-components-react-base";
import React from 'react'

const TextPlain = (props) => <div className={props.baseCssClass}><p className="cmp-text__paragraph">{props.text}</p></div>;
const TextRich = (props) => {
    const text = props.text;
    const id = (props.id) ? props.id : (props.cqPath ? props.cqPath.substr(props.cqPath.lastIndexOf('/') + 1) : "");
    return  <div className={props.baseCssClass}  id={id} data-rte-editelement dangerouslySetInnerHTML={{__html: text}}/>
};

const Text = (props) => {
    const {richText = false} = props

    return richText ? <TextRich {...props} /> : <TextPlain {...props} />
}

const RESOURCE_TYPE = "wknd-app/components/text";

const EditConfig = {
    emptyLabel: "Text",
    isEmpty: (props) => props.text == null || props.text.length === 0,
    resourceType: RESOURCE_TYPE
};

MapTo(RESOURCE_TYPE)(Text, EditConfig);

const AEMText = withMappable(Text, EditConfig);

export default AEMText;
