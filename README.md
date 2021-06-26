# qualibpmn
JS library for quality evaluation of BPMN files.

Include as usual JavaScript library:

```html
<!-- Attach dependencies -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/x2js/1.1.3/xml2json.min.js" integrity="sha512-xl6hrpp8+qe3CwgDhhcLAMSMC/8To5kwYDgLUcA95R9xcbxiTChpd1Egu24Xk5axY1Del9opQg8S9WyEYSGNZg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<!-- Reference library file -->
<script src="qualibpmn.js"></script>
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
