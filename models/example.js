module.exports = {
    transform
  } 
  
  function transform(itm){
    return {
      "Name": itm.name,
      "NodeType":"Person",
      "SourceSystem": "CSVHarvester",
      "Priority": 1,
      "ConformedDimensions": {
        "Code": itm.code
      },
      "Properties": {

      },
      "Connections":[
        {
          "NodeType": "Skill",
          "RelType": "IN_SECTION",
          "ForwardRel": true,
          "ConformedDimensions": {
            "sectionId": itm.skill
          },
          "Properties": {

          }
        }
      ]
    }
  }