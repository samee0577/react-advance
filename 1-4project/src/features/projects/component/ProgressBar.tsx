import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type progress = {
    total: number,
    done: number
}

export const MyProgress = ({ total, done }: progress) => {
    // Calculate percentage
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


