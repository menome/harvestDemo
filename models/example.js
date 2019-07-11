module.exports = {
  transform
} 

function transform(itm){
return {
  "Name": itm.CASENAME,
  "NodeType":"MineralRightsClaim",
  "SourceSystem": "CSVHarvester",
  "Priority": 1,
  "ConformedDimensions": {
    "ObjectID":itm.OBJECTID
  },
  "Properties": {
    "SubsurfaceRightsID":itm.SUBSURFACERIGHTID,
    "LocalCaseID":itm.LOCALCASEID,
    "RightName":itm.RIGHTNAME,
    "ExpirationDate":itm.EXPIRATIONDATE,
    "ActionDate":itm.ACTIONDATE,
    "ActionCalYear":itm.ACTIONCALYEAR,
    "ActionFiscalYear":itm.ACTIONFISCALYEAR,
    "Comments":itm.COMMENTS,
    "Region":itm.REGION,
    "OfficialAcres":itm.OFFICIAL_ACRES,
    "GISAcres":itm.GIS_ACRES,
    "Minerals":itm.MINERALS,
    "NFS_LANDUNIT_FK":itm.NFS_LANDUNIT_FK,
    "ShapeLength":itm.SHAPE_Length,
    "ShapeArea":itm.SHAPE_Area
  },
  "Connections":[
    {
      "NodeType": "ClaimantType",
      "RelType": "CLAIMANT_TYPE",
      "ForwardRel": true,
      "ConformedDimensions": {
        "sectionId": itm.CLAIMANTTYPE
      },
      "Properties": {

      }
    },
    {
      "NodeType": "CaseClass",
      "RelType": "CASE_CLASS",
      "ForwardRel": true,
      "ConformedDimensions": {
        "sectionId": itm.CASECLASS
      },
      "Properties": {

      }
    },
    {
      "NodeType": "RightRype",
      "RelType": "RIGHT_TYPE",
      "ForwardRel": true,
      "ConformedDimensions": {
        "sectionId": itm.RIGHTTYPE
      },
      "Properties": {

      }
    },
    {
      "NodeType": "StatusMethod",
      "RelType": "STATUS_METHOD",
      "ForwardRel": true,
      "ConformedDimensions": {
        "sectionId": itm.STATUSMETHOD
      },
      "Properties": {

      }
    }
  ]
}
}