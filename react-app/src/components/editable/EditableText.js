import { EditableComponent, MapTo } from '@adobe/aem-react-editable-components';
import { Text, textIsEmpty } from "./core/Text";
import React from 'react'
import { withConditionalPlaceHolder } from "./core/util/withConditionalPlaceholder";
import { withStandardBaseCssClass } from "./core/util/withStandardBaseCssClass";

const RESOURCE_TYPE = "wknd-app/components/text";

const EditConfig = {
    emptyLabel: "Text",
    isEmpty: textIsEmpty,
    resourceType: RESOURCE_TYPE
};

const WrappedText = withConditionalPlaceHolder(withStandardBaseCssClass(Text, "cmp-text"), textIsEmpty, "TextV2")

const EditableText = (props) => <EditableComponent config={EditConfig} {...props}><WrappedText {...props} /></EditableComponent>

MapTo(RESOURCE_TYPE)(EditableText);

export default EditableText;
