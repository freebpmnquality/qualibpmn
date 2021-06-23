/**
 * Utilities to evaluate BPMN quality.
 * 
 * @author https://github.com/andriikopp
 */
class QualiBPMNUtil {
    /**
     * GET HTTP method.
     */
    static GET_REQUEST = 'GET';

    /**
     * BPMN symbols.
     */
    static BPMN_SYMBOLS = {
        TASK: 'task',
        SUB_PROCESS: 'subProcess',
        ACTIVITY: 'activity',
        EVENT: 'Event',
        START_EVENT: 'startEvent',
        END_EVENT: 'endEvent',
        INTERMEDIATE_EVENT: 'intermediateEvent',
        GATEWAY: 'gateway'
    };

    /**
     * Warnings regarding detected errors.
     */
    static BPMN_WARNINGS = {
        TASK: 'Tasks should have one incoming and one outgoing sequence flow.',
        START_EVENT: 'Start events should have one outgoing sequence flow.',
        END_EVENT: 'End events should have one incoming sequence flow.',
        INTERMEDIATE_EVENT: 'Intermediate events should have one incoming and one outgoing sequence flow.',
        GATEWAY: 'Gateways should be either splits (one incoming and several outgoing sequence flows) or joins (several incoming and one outgoing sequence flow).'
    }

    /**
     * Error images of BPMN elements.
     */
    static ERROR_IMAGES = [
        // --------------------------------------------------------------------------------------------------------------------
        // ACTIVITY
        // --------------------------------------------------------------------------------------------------------------------

        // ACTIVITY, IN: 0, OUT: 0
        {
            image: [
                1, // ACTIVITY

                0, // GATEWAY

                0, // START_EVENT
                0, // END_EVENT
                0, // INTERMEDIATE_EVENT

                1, // incoming === 0
                1, // outgoing === 0

                0, // incoming === 1
                0, // outgoing === 1

                0, // incoming > 1
                0 // outgoing > 1
            ],
            description: this.BPMN_WARNINGS.TASK
        },

        // ACTIVITY, IN: 0, OUT: 1
        {
            image: [
                1, // ACTIVITY

                0, // GATEWAY

                0, // START_EVENT
                0, // END_EVENT
                0, // INTERMEDIATE_EVENT

                1, // incoming === 0
                0, // outgoing === 0

                0, // incoming === 1
                1, // outgoing === 1

                0, // incoming > 1
                0 // outgoing > 1
            ],
            description: this.BPMN_WARNINGS.TASK
        },

        // ACTIVITY, IN: 1, OUT: 0
        {
            image: [
                1, // ACTIVITY

                0, // GATEWAY

                0, // START_EVENT
                0, // END_EVENT
                0, // INTERMEDIATE_EVENT

                0, // incoming === 0
                1, // outgoing === 0

                1, // incoming === 1
                0, // outgoing === 1

                0, // incoming > 1
                0 // outgoing > 1
            ],
            description: this.BPMN_WARNINGS.TASK
        },

        // ACTIVITY, IN: 0, OUT: > 1
        {
            image: [
                1, // ACTIVITY

                0, // GATEWAY

                0, // START_EVENT
                0, // END_EVENT
                0, // INTERMEDIATE_EVENT

                1, // incoming === 0
                0, // outgoing === 0

                0, // incoming === 1
                0, // outgoing === 1

                0, // incoming > 1
                1 // outgoing > 1
            ],
            description: this.BPMN_WARNINGS.TASK
        },

        // ACTIVITY, IN: > 1, OUT: 0
        {
            image: [
                1, // ACTIVITY

                0, // GATEWAY

                0, // START_EVENT
                0, // END_EVENT
                0, // INTERMEDIATE_EVENT

                0, // incoming === 0
                1, // outgoing === 0

                0, // incoming === 1
                0, // outgoing === 1

                1, // incoming > 1
                0 // outgoing > 1
            ],
            description: this.BPMN_WARNINGS.TASK
        },

        // ACTIVITY, IN: 1, OUT: > 1
        {
            image: [
                1, // ACTIVITY

                0, // GATEWAY

                0, // START_EVENT
                0, // END_EVENT
                0, // INTERMEDIATE_EVENT

                0, // incoming === 0
                0, // outgoing === 0

                1, // incoming === 1
                0, // outgoing === 1

                0, // incoming > 1
                1 // outgoing > 1
            ],
            description: this.BPMN_WARNINGS.TASK
        },

        // ACTIVITY, IN: > 1, OUT: 1
        {
            image: [
                1, // ACTIVITY

                0, // GATEWAY

                0, // START_EVENT
                0, // END_EVENT
                0, // INTERMEDIATE_EVENT

                0, // incoming === 0
                0, // outgoing === 0

                0, // incoming === 1
                1, // outgoing === 1

                1, // incoming > 1
                0 // outgoing > 1
            ],
            description: this.BPMN_WARNINGS.TASK
        },

        // ACTIVITY, IN: > 1, OUT: > 1
        {
            image: [
                1, // ACTIVITY

                0, // GATEWAY

                0, // START_EVENT
                0, // END_EVENT
                0, // INTERMEDIATE_EVENT

                0, // incoming === 0
                0, // outgoing === 0

                0, // incoming === 1
                0, // outgoing === 1

                1, // incoming > 1
                1 // outgoing > 1
            ],
            description: this.BPMN_WARNINGS.TASK
        },

        // --------------------------------------------------------------------------------------------------------------------
        // GATEWAY
        // --------------------------------------------------------------------------------------------------------------------

        // ...

        // --------------------------------------------------------------------------------------------------------------------
        // START EVENT
        // --------------------------------------------------------------------------------------------------------------------

        // ...

        // --------------------------------------------------------------------------------------------------------------------
        // END EVENT
        // --------------------------------------------------------------------------------------------------------------------

        // ...

        // --------------------------------------------------------------------------------------------------------------------
        // INTERMEDIATE EVENT
        // --------------------------------------------------------------------------------------------------------------------

        // ...
    ];

    /**
     * Returns the BPMN code by URL.
     */
    static getBPMNByURL(url) {
        return $.ajax({
            type: this.GET_REQUEST,
            url: url,
            async: false
        }).responseText;
    }

    /**
     * Translates BPMN 2.0 XML to JSON document.
     */
    static translateBPMNToJSON(bpmn) {
        const converter = new X2JS();

        return converter.xml_str2json(bpmn);
    }

    /**
     * Extracts process definitions from the BPMN JSON.
     */
    static getProcesses(bpmnJSON) {
        return bpmnJSON.definitions.process;
    }

    /**
     * Get generic element's type.
     */
    static getGenericType(typeName) {
        if (typeName.toLowerCase().includes(this.BPMN_SYMBOLS.TASK.toLowerCase()) ||
            typeName.toLowerCase().includes(this.BPMN_SYMBOLS.SUB_PROCESS.toLowerCase())) {

            return this.BPMN_SYMBOLS.ACTIVITY;
        } else if (typeName.includes(this.BPMN_SYMBOLS.EVENT)) {
            if (typeName.toLowerCase().includes(this.BPMN_SYMBOLS.START_EVENT.toLowerCase()) ||
                typeName.toLowerCase().includes(this.BPMN_SYMBOLS.END_EVENT.toLowerCase())) {

                return typeName;
            } else {

                return this.BPMN_SYMBOLS.INTERMEDIATE_EVENT;
            }
        } else if (typeName.toLowerCase().includes(this.BPMN_SYMBOLS.GATEWAY.toLowerCase())) {

            return this.BPMN_SYMBOLS.GATEWAY;
        }

        return undefined;
    }

    /**
     * Created the element's binary image.
     */
    static getElementImage(element) {
        return [
            // Type features
            element.type === this.BPMN_SYMBOLS.ACTIVITY ? 1 : 0,

            element.type === this.BPMN_SYMBOLS.GATEWAY ? 1 : 0,

            element.type === this.BPMN_SYMBOLS.START_EVENT ? 1 : 0,
            element.type === this.BPMN_SYMBOLS.END_EVENT ? 1 : 0,
            element.type === this.BPMN_SYMBOLS.INTERMEDIATE_EVENT ? 1 : 0,

            // Connection features
            element.incoming === 0 ? 1 : 0,
            element.outgoing === 0 ? 1 : 0,

            element.incoming === 1 ? 1 : 0,
            element.outgoing === 1 ? 1 : 0,

            element.incoming > 1 ? 1 : 0,
            element.outgoing > 1 ? 1 : 0
        ];
    }

    /**
     * Returns flat element from parsed process element.
     */
    static getFlatProcessElement(element, type) {
        const object = {
            name: element._name === undefined ? element._id : element._name,
            type: this.getGenericType(type),
            incoming: element.incoming === undefined ? 0 : element.incoming.length === undefined ? 1 : element.incoming.length,
            outgoing: element.outgoing === undefined ? 0 : element.outgoing.length === undefined ? 1 : element.outgoing.length
        };

        object.image = this.getElementImage(object);

        return object;
    }

    /**
     * Extracts flat object of process elements.
     */
    static getFlatProcessElements(process) {
        const flatProcess = {
            name: process._name === undefined ? process._id : process._name,
            elements: []
        };

        for (const key in process) {
            if (!Array.isArray(process[key])) {
                const element = this.getFlatProcessElement(process[key], key);

                if (element.type !== undefined) {
                    flatProcess.elements.push(element);
                }
            } else {
                for (const i in process[key]) {
                    const element = this.getFlatProcessElement(process[key][i], key);

                    if (element.type !== undefined) {
                        flatProcess.elements.push(element);
                    }
                }
            }
        }

        return flatProcess;
    }

    /**
     * Returns distance between two process symbol images.
     */
    static getDistance(x, y) {
        let sum = 0;

        for (let i = 0; i < x.length; i++) {
            sum += Math.abs(x[i] - y[i]);
        }

        return sum;
    }

    /**
     * Evaluate business process.
     */
    static evaluateProcess(process) {
        for (const i in process.elements) {
            process.elements[i].evaluation = [];

            for (const j in this.ERROR_IMAGES) {
                const similarity = this.getDistance(process.elements[i].image, this.ERROR_IMAGES[j].image);

                if (similarity === 0) {
                    process.elements[i].evaluation.push({
                        image: this.ERROR_IMAGES[j].image,
                        similarity: similarity,
                        description: this.ERROR_IMAGES[j].description
                    });
                }
            }
        }

        return process;
    }
}