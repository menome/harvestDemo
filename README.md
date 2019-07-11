# Menome Harvest Demo

This demo illustrates the Menome Data Atomization pattern. It includes an example of the CSV harvester bot which takes a model and a CSV file, and atomizes the CSV file into a neo4j graph 

## CSV Harvesting Pattern

There are several key components to the CSV harvesting pattern:

- CSV File - while the csvHarvester can handle any number of CSV files, this demo will illustrate the pattern using a single file. The CSV file must be in standard CSV format, and have the column names in the first row of data. The csvHarvester can access files stored anywhere using the Menome Librarian, but for this demo, the file must be placed into the **./local** folder provided. 
- Model File - the Menome BotFramework uses simple Javascript based model files using the Menome Data Atomization mapping pattern to translate source data into a simple JSON based messaging structure. The Model file provided shows the key elements of the mapping structure. 
- RabbitMQ - while the Menome BotFramework can use other messaging systems such as Kafka, for the purposes of CSV files we have found that RabbitMQ is the easiest to work with, most lightweight, and simplest of these to setup. Menome uses a standard RabbitMQ container, which the BotFramework initializes automatically using an internal configuraiton process. 
- DataRefinery - The Menome Data Refinery is at the heart of the Menome Data Atomization pattern. The DataRefinery connects to the RabbitMQ instance and waits for Menome Data Atoms to arrive on the Refinery Queue. The refinery uses these messages to generate Nodes and Relationships automatically the Neo4j instance. 

The pattern for the CSV demo: 

### Example Model

The Menome BotFramework can harvest data from virutally any source including REST, Soap, SQL, noSQL. The harvesting functions vary a bit depending on the source, but the model structure for each of these sources remains consistent. 

The BotFramework transform function is a simple mapping pattern that delivers an ITEM from the source. The ITEM contains all of the key value pairs available from the source as a regular javascript object. 

The model is composed of two primary element: Node and Connections to the Node. 

### Data Subject 

The Data Subject corresponds to the Node in the graph database. 

* Name - the Name property to be assigned to the Node
* NodeType - the Label to assign to the Node
* SourceSystem - this property allows the Menome framework to track which system this Node was contributed from. This can be set using paramters.
* Priority - Sets the overll priority associated with the system. This is used by the Menome DataRefinery to determine which SourceSystems take precendence when mapping the same property from several systems to the same node. 
* ConformedDimension - this is the key used to idenfity a unique instance of a Node. One or many ConformedDimensions can be set to inform the Refinery of how to merge data from source systems. 
* Properties - this is a list of properties to set on the Node


```
{
      "Name": itm.name,
      "NodeType":"Person",
      "SourceSystem": "CSVHarvester",
      "Priority": 1,
      "ConformedDimensions": {
        "Code": itm.code
      },
      "Properties": {

      },
```

### Connections 

Connections are first degree relationships to the specific Node. 

* NodeType: Type of node being connected to
* RelType: Relationship Name 





```
{
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

          },
          "RelProps": {
              
          }          
        }
      ]
    }
```

- transform functions - the bot framework can d

### Data Atom Message: 

##############
Model transform functions should return a JSON object with the following structure. 
{
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

          },
          "RelProps": {
              
          }          
        }
      ]
    }

## Setting Up Demo

A sample CSV file and Model are provided, but any CSV file or model can be used. 


### CSV-Extractor Bot

send it a path, library, and model and it will extract all data atoms out of the csv using the model
LibraryPath = 'local' means that the file is in the local directory and librarian is not needed


