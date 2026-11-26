import React from 'react';

interface ProjectVisualPlaceholderProps {
  projectId?: string;
  projectName: string;
}

export const ProjectVisualPlaceholder: React.FC<ProjectVisualPlaceholderProps> = ({ projectName }) => {
  return (
    <div
      className="w-full border border-white/[0.08] rounded-2xl bg-white/[0.02] min-h-[260px] flex flex-col items-center justify-center text-center p-6"
    >
      {/* TODO(animation): replace with a bespoke visualizer */}
      <div className="text-sm font-semibold text-white mb-2">Interactive walkthrough coming soon</div>
      <div className="text-[11px] font-mono text-zinc-500">{projectName}</div>
    </div>
  );
};
