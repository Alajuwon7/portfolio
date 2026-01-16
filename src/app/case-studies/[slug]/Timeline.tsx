import styles from "./case-study.module.css";

type TimelineMilestone = {
  date: string;
  title: string;
  description: string;
  status: "completed" | "current" | "future";
  icon?: "rocket" | "check" | "percentage";
  percentage?: string;
};

export default function Timeline({ milestones }: { milestones: TimelineMilestone[] }) {
  // Calculate positions for milestones
  const getMilestonePosition = (index: number, total: number) => {
    if (total === 1) return 50;
    return (index / (total - 1)) * 100;
  };

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineBarWrapper}>
        {/* Main timeline line */}
        <div className={styles.timelineLine}>
          {milestones.map((milestone, index) => {
            if (index === milestones.length - 1) return null;
            // Segment is active only if the END milestone is completed/current
            // This ensures the line stops at the last completed milestone
            const endMilestone = milestones[index + 1];
            const isActive = endMilestone.status === "completed" || endMilestone.status === "current";
            return (
              <div
                key={`segment-${index}`}
                className={`${styles.timelineLineSegment} ${
                  isActive ? styles.timelineLineSegmentActive : styles.timelineLineSegmentInactive
                }`}
                style={{ 
                  width: `${100 / (milestones.length - 1)}%`,
                  left: `${(index / (milestones.length - 1)) * 100}%`
                }}
              />
            );
          })}
        </div>

        {/* Milestones */}
        <div className={styles.timelineMilestones}>
          {milestones.map((milestone, index) => {
            const position = getMilestonePosition(index, milestones.length);
            const isActive = milestone.status === "completed" || milestone.status === "current";
            
            return (
              <div
                key={milestone.date}
                className={styles.timelineMilestone}
                style={{ left: `${position}%` }}
              >
                <div
                  className={`${styles.milestoneIcon} ${
                    isActive ? styles.milestoneIconActive : styles.milestoneIconInactive
                  }`}
                >
                  {milestone.icon === "rocket" && (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                      <path
                        d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                  {milestone.icon === "check" && (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                      <path
                        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                  {milestone.icon === "percentage" && milestone.percentage && (
                    <span className={styles.milestonePercentage}>{milestone.percentage}</span>
                  )}
                  {!milestone.icon && (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                      <path
                        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                </div>
                <div className={styles.milestoneContent}>
                  <div className={styles.milestoneDate}>{milestone.date}</div>
                  <div className={styles.milestoneTitle}>{milestone.title}</div>
                  <div className={styles.milestoneDescription}>{milestone.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
