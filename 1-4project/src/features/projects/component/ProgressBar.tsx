import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type progress = {
    total: number,
    done: number
}

export const MyProgress = ({total, done}:progress) => {
    // Calculate percentage
    const percentage = total > 0 ? Math.min((done / total) * 100, 100) : 0;

    return (
        <div style={{ width: 50, height: 50 }}>
            <CircularProgressbar
                value={percentage}
                text={`${done}/${total}`}
                styles={buildStyles({
                    // Customizing colors and look
                    pathColor: '#3b82f6',     /* Blue progress bar */
                    textColor: '#1f2937',     /* Dark text label */
                    trailColor: '#e6e6e6',    /* Grey background track */
                    strokeLinecap: 'round',   /* Rounded edges */
                })}
            />
        </div>
    );
};


