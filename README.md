# qualibpmn
JS library for quality evaluation of BPMN files.

Include as usual JavaScript library:

```html
<!-- Reference JS file -->
<script src="qualibpmn.js"></script>

<!-- Or better use minified JS file -->
<script src="qualibpmn.min.js"></script>
```

Basic usage example:

```javascript
const url = 'https://raw.githubusercontent.com/freebpmnquality/cloud-services/main/analytics/samples/01-tasks.bpmn';

// Fetch BPMN
const bpmn = QualiBPMNUtil.getBPMNByURL(url);

// Convert to JSON
const json = QualiBPMNUtil.translateBPMNToJSON(bpmn);

// Extract processes
const processes = QualiBPMNUtil.getProcesses(json);

for (const process in processes) {
	// Get flat process elements data
	const flat = QualiBPMNUtil.getFlatProcessElements(processes[process]);

	// Evaluate process elements
	const evaluated = QualiBPMNUtil.evaluateProcess(flat);

	console.log(evaluated);
	
	// Measure process quality
        const measured = QualiBPMNUtil.measureSyntacticQuality(evaluated);

        console.log(measured);
}
```

Expected output for the first pool in the given BPMN file accessed in ```url```:

```javascript
{
   "name":"Process_1idljgp",
   "elements":[
      {
         "name":"Event_1wpssqp",
         "type":"startEvent",
         "incoming":0,
         "outgoing":1,
         "image":[0,0,1,0,0,1,0,0,1,0,0],
         "evaluation":[]
      },
      {
         "name":"Implicit workflow end",
         "type":"activity",
         "incoming":1,
         "outgoing":0,
         "image":[1,0,0,0,0,0,1,1,0,0,0],
         "evaluation":[
            {
               "image":[1,0,0,0,0,0,1,1,0,0,0],
               "similarity":0,
               "description":"Tasks should have one incoming and one outgoing sequence flow."
            }
         ]
      }
   ]
}
```
