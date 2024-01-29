import { Project } from '../types/project'

export function CardARCreation(
  props: Pick<Project, 'created_by' | 'video' | 'title'>
) {
  return (
    <div className="w-full max-w-60 md:max-w-none rounded-lg overflow-hidden shadow-md relative">
      <div className="flex w-full bg-purple-100 aspect-[9/16] items-center justify-center p-0">
        {/* PLAYER HERE */}
        <video
          preload="none"
          controls
          autoPlay={true}
          loop={false}
          playsInline={true}
          src={props.video}
          muted
          crossOrigin="anonymous"
        ></video>
      </div>
      <div className="p-4 text-xs text-center flex items-center justify-center">
        Created by {props.created_by}
      </div>
    </div>
  )
}
