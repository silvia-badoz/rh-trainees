# Technical Exercice for first recruitment stage

You can choose between Frontend, Mobile, or Backend exercise.

This choice will influence the job you will eventually obtain in our company.

Your submission : 
- Fork this repository
- Work on your Fork
- Submit a pull request when you're done
- For Frontend and Backend exercises, you must publish the result on a Web Server
- For Mobile exercise, you must send us the .apk or iOS app so that we can install it on our phones

## Frontend

## Backend

You must create a web server with a path `POST ${yourURL}/expand_validator`. 
You can choose the technologies you want. 

We will make a POST request to your API containing this kind of content **in the body** of the request.
Your API must respond in JSON to.

### Input Example

```json
{
  "a.*.y.t": "integer",
  "a.*.y.u": "integer",
  "a.*.z": "object|keys:w,o",
  "b": "array",
  "b.c": "string",
  "b.d": "object",
  "b.d.e": "integer|min:5",
  "b.d.f": "string"
}
```

This is an object that uses the same notation than Laravel Validators.

`*` represents an array, and string keys represent the properties of this object.
The Input example can be read this way :
- An object withs properties `a,b`
- The property `a` contains an array of objects which properties are `y,z` 
- The property `b` is an object (or an associative array / HashMap) with properties `c,d`


Your backend must expand it to output a structured and labelled tree like this :

## Output Example
```json
{
  "a": {
    "type": "array",
    "validators": [
      "array"
    ],
    "items": {
      "type": "object",
      "validators": [
        "object"
      ],
      "properties": {
        "y": {
          "type": "object",
          "validators": [
            "object"
          ],
          "properties": {
            "t": {
              "type": "leaf",
              "validators": [
                "integer"
              ]
            },
            "u": {
              "type": "leaf",
              "validators": [
                "integer"
              ]
            }
          }
        },
        "z": {
          "type": "object",
          "validators": [
            "object"
          ],
          "properties": {
            "w": {
              "type": "leaf",
              "validators": []
            },
            "o": {
              "type": "leaf",
              "validators": []
            }
          }
        }
      }
    }
  },
  "b": {
    "type": "object",
    "validators": [
      "object"
    ],
    "properties": {
      "c": {
        "validators": [
          "string"
        ],
        "type": "leaf"
      },
      "d": {
        "type": "object",
        "validators": [
          "object"
        ],
        "properties": {
          "e": {
            "validators": [
              "integer",
              "min:5"
            ],
            "type": "leaf"
          },
          "f": {
            "validators": [
              "string"
            ],
            "type": "leaf"
          }
        }
      }
    }
  }
}
```

## Mobile