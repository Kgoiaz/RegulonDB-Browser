import { toInt, eMes } from "./util";
import { dnaObjects_list } from "../features_default_properties";

export function validateElements(dnaObjects = []) {
  if (!dnaObjects || dnaObjects.length === 0) {
    return null;
  }
  let validate_dnaObjects = [];
  let preValidate_dnaObjects = [];

  dnaObjects.map((ge, inx) => {
    let dnaObject = { ...ge }
    let distinct = "obj_"
    if (dnaObject?._id) {
      if (dnaObject?.objectType) {
        distinct += dnaObject.objectType + "_"
        if (!dnaObjects_list.find(objectType => objectType === dnaObject.objectType)) {
          eMes(`object type not defined: ${dnaObject?.objectType} `, inx);
          return null;
        }
        if (dnaObject?.leftEndPosition && dnaObject?.rightEndPosition) {
          //console.log(feature?.leftEndPosition)
          distinct += dnaObject.leftEndPosition + "_" + dnaObject.rightEndPosition
          if (!`${dnaObject?.leftEndPosition}`.indexOf("+")) {
            dnaObject.cut = "left"
          }
          if (!`${dnaObject?.rightEndPosition}`.indexOf("+")) {
            dnaObject.cut = "right"
          }
          let leftEndPosition = toInt(dnaObject?.leftEndPosition);
          let rightEndPosition = toInt(dnaObject?.rightEndPosition);
          if (leftEndPosition <= rightEndPosition) {
            dnaObject.leftEndPosition = leftEndPosition;
            dnaObject.rightEndPosition = rightEndPosition;
            if (dnaObject?.strand) {
              distinct += dnaObject.strand
              if (!preValidate_dnaObjects.find(obj => obj === distinct)) {
                preValidate_dnaObjects.push(distinct)
                validate_dnaObjects.push(dnaObject);
              }

            } else {
              eMes("strand", inx);
            }
          } else {
            console.warn(
              inx,
              "positions error",
              dnaObject?.leftEndPosition,
              dnaObject?.rightEndPosition
            );
          }
        } else {
          if (dnaObject?.linkedObjectWhenNoPositions) {
            let leftEndPosition = toInt(dnaObject?.linkedObjectWhenNoPositions?.leftEndPosition);
            let rightEndPosition = toInt(dnaObject?.linkedObjectWhenNoPositions?.rightEndPosition);
            if (leftEndPosition <= rightEndPosition) {
              dnaObject.leftEndPosition = leftEndPosition;
              dnaObject.rightEndPosition = rightEndPosition;
              dnaObject.strand = dnaObject?.linkedObjectWhenNoPositions?.strand
              /*
              dnaObject.anchor = {
                _id: dnaObject?.linkedObjectWhenNoPositions?.id, 
                leftEndPosition: leftEndPosition,
                rightEndPosition: rightEndPosition,
                strand: dnaObject?.linkedObjectWhenNoPositions?.strand
              }*/
              /*
              if(dnaObject?.objectType === "tf_binding_site" && (rightEndPosition-leftEndPosition >= 100)){
                dnaObject.rightEndPosition = leftEndPosition+30; 
              }*/
              if (dnaObject?.strand) {
                validate_dnaObjects.push(dnaObject);
              } else {
                eMes("strand", inx);
              }
            } else {
              console.warn(
                inx,
                "positions error",
                dnaObject?.leftEndPosition,
                dnaObject?.rightEndPosition
              );
            }
          } else {
            eMes("posLeft and PosRight", inx);
          }
        }
      } else {
        eMes("object Type", inx);
      }
    } else {
      eMes("id", inx);
    }
    return null;
  });
  if (validate_dnaObjects.length > 0) {
    //console.log(dnaFeatures_data)
    //console.log(features)
    return validate_dnaObjects;
  }
  return null;
}
