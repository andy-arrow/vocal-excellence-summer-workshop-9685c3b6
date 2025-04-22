
import React from "react";

const schedule = [
  {
    day: "Mon",
    date: "July 15",
    blocks: [
      { time: "09:00–10:00", session: "Warm-up & Welcome" },
      { time: "10:00–11:30", session: "Masterclass: Technique Foundations" },
      { time: "11:45–13:00", session: "Private Lessons" },
      { time: "13:00–14:30", session: "Lunch (provided)" },
      { time: "14:30–16:00", session: "Stage Presence Workshop" },
      { time: "16:15–18:00", session: "Repertoire Coaching" },
    ],
  },
  {
    day: "Tue",
    date: "July 16",
    blocks: [
      { time: "09:00–10:00", session: "Ensemble Rehearsal" },
      { time: "10:15–12:00", session: "Acting for Singers" },
      { time: "12:15–13:00", session: "Private Lessons" },
      { time: "13:00–14:30", session: "Lunch (provided)" },
      { time: "14:30–16:00", session: "Mock Audition Training" },
      { time: "16:15–18:00", session: "Professional Recordings" },
    ],
  },
  {
    day: "Wed",
    date: "July 17",
    blocks: [
      { time: "09:00–10:00", session: "Bodywork & Alexander Technique" },
      { time: "10:15–12:00", session: "Performance Mastery Class" },
      { time: "12:15–13:00", session: "Accompanist Rehearsal" },
      { time: "13:00–14:30", session: "Lunch (provided)" },
      { time: "14:30–16:00", session: "Industry Panel" },
      { time: "16:15–18:00", session: "Recording Portfolio" },
    ],
  },
  {
    day: "Thu",
    date: "July 18",
    blocks: [
      { time: "09:00–10:00", session: "Vocal Health Seminar" },
      { time: "10:15–12:00", session: "Private Lessons" },
      { time: "12:15–13:00", session: "Choir Practice" },
      { time: "13:00–14:30", session: "Lunch (provided)" },
      { time: "14:30–16:00", session: "Stage Movement" },
      { time: "16:15–18:00", session: "Final Showcase Prep" },
    ],
  },
  {
    day: "Fri",
    date: "July 19",
    blocks: [
      { time: "09:00–10:00", session: "Dress Rehearsal" },
      { time: "10:15–12:00", session: "Artist Mindset Seminar" },
      { time: "12:15–13:45", session: "Lunch (provided)" },
      { time: "14:00–16:00", session: "Final Showcase Performance" },
      { time: "16:15–18:00", session: "Feedback & Closing" },
    ],
  },
];

const CurriculumScheduleTable = () => (
  <div className="overflow-x-auto rounded-xl bg-white/80 shadow border border-apple-border/10 my-4">
    <table className="min-w-full text-sm text-apple-text">
      <thead>
        <tr className="bg-apple-light">
          <th className="py-3 px-3 text-left">Day</th>
          <th className="py-3 px-3 text-left">Date</th>
          <th className="py-3 px-3 text-left">Session Blocks</th>
        </tr>
      </thead>
      <tbody>
        {schedule.map((day, i) => (
          <tr key={day.day} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
            <td className="font-bold py-3 px-3">{day.day}</td>
            <td className="py-3 px-3">{day.date}</td>
            <td className="py-3 px-3">
              <ul className="space-y-1">
                {day.blocks.map((block, idx) => (
                  <li key={block.time + idx}>
                    <span className="font-mono">{block.time}:</span>{" "}
                    <span>{block.session}</span>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CurriculumScheduleTable;
