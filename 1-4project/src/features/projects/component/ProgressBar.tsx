import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import type {feature} from "../types/project"; 

export const MyProgress = ( {features}:{features: feature[]} ) => {
    // Calculate percentage
    const total = features.length; // Total number of features.length ;
    console.table(features);
    const done = features.filter((f) => f.status===true).length;
    const percentage = total > 0 ? Math.min((done / total) * 100, 100) : 0;

    return (
        <div style={{ width: 50, height: 50,margin:"10px" }}>
            <CircularProgressbar
                value={percentage} 
                counterClockwise 
                strokeWidth={14}
                text={`${percentage.toFixed(0)}%`}
                styles={buildStyles({
                    pathColor: '#34ddff',
                    trailColor: '#e5e5e5f9',
                    strokeLinecap: 'round',
                    rotation: 0,
                    textSize: '34px',
                })}
            />
        </div>
    );
};


