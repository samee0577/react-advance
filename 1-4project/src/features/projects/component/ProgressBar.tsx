import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { use } from 'react';
import { ProjectsContext } from '../context/projectContext';

export const MyProgress = ({ ProjectId }: { ProjectId: string }) => {

    const context = use(ProjectsContext)
    if (!context) throw new Error("useProject must be used within a ProjectProvider")
    const { state } = context

    const completion = state.projects.find((project) => project.id === ProjectId)?.completion || 0

    return (
        <div style={{ width: 50, height: 50, margin: "10px" }}>
            <CircularProgressbar
                value={completion}
                counterClockwise
                strokeWidth={14}
                text={`${completion.toFixed(0)}%`}
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


