import { Project } from '../types/project'

export function CardARCreation(
  props: Pick<Project, 'created_by' | 'video' | 'title'>,
) {
  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-md max-w-60 md:max-w-none">
      <div className="flex w-full bg-purple-100 aspect-[9/16] items-center justify-center p-0">
        {/* PLAYER HERE */}
        <video
          preload="none"
          controls
          autoPlay={true}
          loop={false}
          playsInline={true}
          src={props.video ?? undefined}
          muted
        ></video>
      </div>
      <div className="flex items-center justify-center p-4 text-xs text-center">
        Created by {props.created_by}
      </div>
    </div>
  )
}
