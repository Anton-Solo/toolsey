'use client';

import { TUTORIAL_VIDEOS } from '@/constans/ support';
import { useState } from 'react';
import Image from 'next/image';
import { VideoModal } from './VideoModal';

interface VideoItem {
    id: number;
    title: string;
    youtubeId: string;
    description: string;
}

export const VideoPlayer = () => {
    const [activeVideo, setActiveVideo] = useState<VideoItem>(TUTORIAL_VIDEOS[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalVideo, setModalVideo] = useState<VideoItem | null>(null);

    const getYouTubeThumbnail = (videoId: string) => {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    };

    const openModal = (video: VideoItem) => {
        setModalVideo(video);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalVideo(null);
    };

    return (
        <div className="flex lg:flex-row flex-col gap-8">
            <div className="flex-1">
                <div 
                    className="relative cursor-pointer group"
                    onClick={() => openModal(activeVideo)}
                >
                    <Image
                        src={getYouTubeThumbnail(activeVideo.youtubeId)}
                        alt={activeVideo.title}
                        width={1280}
                        height={720}
                        className="w-full h-full min-h-[184px] lg:min-h-[448px] md:min-h-[327px] rounded-2xl object-cover"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 bg-transparent rounded-2xl flex items-center justify-center">
                        <div className="group-hover:bg-accent-dark transition-background duration-300 bg-standart-black rounded-full p-6">
                            <svg className="w-12 h-12 text-standart-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:w-[520px] w-full space-y-4 max-h-[448px] overflow-y-auto pr-6">
                {TUTORIAL_VIDEOS.map((video) => (
                    <div
                        key={video.id}
                        className={`rounded-xl cursor-pointer transition-colors p-1 ${
                            activeVideo.id === video.id 
                            ? 'bg-video-bg' 
                            : 'bg-transparent'
                        }`}
                        onClick={() => setActiveVideo(video)}
                    >
                        <div className="flex gap-4">
                            <Image
                                src={getYouTubeThumbnail(video.youtubeId)}
                                alt={video.title}
                                width={320}
                                height={180}
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

            {/* Video Modal */}
            {modalVideo && (
                <VideoModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    video={modalVideo}
                />
            )}
        </div>
    );
};