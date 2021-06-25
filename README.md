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
