import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface AudioTrack {
  id: string;
  title: string;
  sidamaTitle: string;
  performer: string;
  category: string;
  duration: string;
  description: string;
}

const SAMPLE_TRACKS: AudioTrack[] = [
  {
    id: 'fichee-anthem',
    title: 'Fichee-Chambalaalla Festive Hymn',
    sidamaTitle: 'Fichee Ayyaana Faarsamo',
    performer: 'Sidama Elders & Youth Ensemble',
    category: 'Celebration',
    duration: '3:45',
    description: 'Joyous ceremonial rhythm heralding the new year, invoking peace, health, and agricultural abundance.'
  },
  {
    id: 'coffee-harvest-song',
    title: 'Highland Coffee Harvesters Chant',
    sidamaTitle: 'Buna Qocachu Faarso',
    performer: 'Aleta Wondo Farm Guild',
    category: 'Work Song',
    duration: '2:50',
    description: 'Polyrhythmic call-and-response song sung during morning red-cherry picking in agroforestry gardens.'
  },
  {
    id: 'luwa-elder-blessing',
    title: 'Luwa System Blessing of the Generations',
    sidamaTitle: 'Luwa Qeesi Maassanno',
    performer: 'Woma Council Elders',
    category: 'Sacred Chant',
    duration: '4:15',
    description: 'Solemn traditional blessing invoking ancestral wisdom, clan reconciliation, and communal stewardship.'
  }
];

export const CulturalAudioPlayer: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [activeTrackIndex, setActiveTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const currentTrack = SAMPLE_TRACKS[activeTrackIndex];

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <Card className={`border border-border/80 shadow-md bg-card/90 backdrop-blur-sm ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Sidama Cultural Audio Guide</CardTitle>
              <CardDescription className="text-xs">Authentic songs, oral chants & harvest rhythms</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {currentTrack.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="p-3 bg-muted/50 rounded-lg border border-border/50">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-foreground text-sm">{currentTrack.title}</p>
              <p className="text-xs text-primary font-medium italic">{currentTrack.sidamaTitle}</p>
              <p className="text-xs text-muted-foreground mt-1">Artist: {currentTrack.performer}</p>
            </div>
            <span className="text-xs font-mono text-muted-foreground">{currentTrack.duration}</span>
          </div>

          {showInfo && (
            <div className="mt-3 pt-2 border-t border-border/50 text-xs text-muted-foreground">
              {currentTrack.description}
            </div>
          )}
        </div>

        {/* Player Controls */}
        <div className="flex items-center justify-between gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowInfo(prev => !prev)}
            title="Track Background Information"
            aria-label="Track Information"
          >
            <Info className={`w-4 h-4 ${showInfo ? 'text-primary' : 'text-muted-foreground'}`} />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={togglePlay}
              className="gap-2 px-4"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause Audio' : 'Listen Now'}</span>
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-muted-foreground" /> : <Volume2 className="w-4 h-4" />}
          </Button>
        </div>

        {/* Playlist Selector */}
        <div className="pt-2 border-t border-border/40">
          <p className="text-xs font-semibold text-muted-foreground mb-2">Available Recordings</p>
          <div className="grid grid-cols-1 gap-1.5">
            {SAMPLE_TRACKS.map((track, idx) => (
              <button
                key={track.id}
                type="button"
                onClick={() => {
                  setActiveTrackIndex(idx);
                  setIsPlaying(true);
                }}
                className={`text-left p-2 rounded text-xs transition-colors flex items-center justify-between ${
                  idx === activeTrackIndex
                    ? 'bg-primary/10 text-primary font-semibold border border-primary/20'
                    : 'hover:bg-muted text-muted-foreground'
                }`}
              >
                <span className="truncate">{track.title}</span>
                <span className="text-[10px] opacity-70 ml-2">{track.duration}</span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CulturalAudioPlayer;
