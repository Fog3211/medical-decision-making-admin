import { Chart, Tooltip, Edge, View, Polygon, Coord } from 'viser-react';
import ReactDOM from 'react-dom';
import React from 'react';


const DataSet = require('@antv/data-set');
const data = []
const ds: any = new DataSet();
const dv = ds.createView().source(data, {
    type: 'graph',
    edges: d => d.links
});

dv.transform({
    type: 'diagram.arc',
    sourceWeight: e => e.sourceWeight,
    targetWeight: e => e.targetWeight,
    weight: true,
    marginRatio: 0.3
});

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const label = [
            'name', {
                labelEmit: true,
                textStyle: {
                    fill: '#8c8c8c'
                },
            }
        ];

        const scale = [{
            dataKey: 'x',
            sync: true,
        }, {
            dataKey: 'y',
            sync: true,
        }];

        return (
            <div>
                <Chart forceFit height={window.innerHeight} scale={scale}>
                    <View data={dv.edges}>
                        <Coord type="polar" direction="yReverse" />
                        <Edge position='x*y' color='source' shape='arc' opacity={0.5} tooltip={'source*target*value'} />
                    </View>
                    <View data={dv.nodes}>
                        <Coord type="polar" direction="yReverse" />
                        <Polygon position='x*y' color='id' label={label} />
                    </View>
                </Chart>
            </div>
        );
    }
}