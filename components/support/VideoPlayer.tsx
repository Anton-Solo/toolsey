'use client';

import { TUTORIAL_VIDEOS } from '@/constans/ support';
import { useState } from 'react';

interface VideoItem {
    id: number;
    title: string;
    youtubeId: string;
    description: string;
}

interface YouTubePlayerProps {
    videos: VideoItem[];
}

export const VideoPlayer = () => {
    const [activeVideo, setActiveVideo] = useState<VideoItem>(TUTORIAL_VIDEOS[0]);

    const getYouTubeThumbnail = (videoId: string) => {
        return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    };

    return (
        <div className="flex lg:flex-row flex-col gap-8">
            <div className="flex-1">
                <iframe
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}`}
                    title={activeVideo.title}
                    className="w-full h-full rounded-2xl"
                    allowFullScreen
                />
            </div>

            <div className="lg:w-[520px] w-full space-y-4 max-h-[448px] overflow-y-auto">
                {TUTORIAL_VIDEOS.map((video) => (
                    <div
                        key={video.id}
                        className={`rounded-xl cursor-pointer transition-colors ${
                            activeVideo.id === video.id 
                            ? 'bg-video-bg' 
                            : 'bg-transparent'
                        }`}
                        onClick={() => setActiveVideo(video)}
                    >
                        <div className="flex gap-4 mb-2">
                            <img
                                src={getYouTubeThumbnail(video.youtubeId)}
                                alt={video.title}
                                className="w-1/3 h-[110px] object-cover rounded-lg"
                            />
                            <div>
                                <p className='p-body-20 font-bold mb-2'>{video.title}</p>
                                <p className='text-sm text-accent'>{video.description}</p>
                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};