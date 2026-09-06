import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Leaf, Heart, Users, Trees, CheckCircle2, Award } from 'lucide-react';

interface EcoTourismPledgeModalProps {
  triggerButton?: React.ReactNode;
}

const PLEDGE_PRINCIPLES = [
  {
    icon: Trees,
    title: 'Sanctuary of Sacred Groves & Agroforests',
    description: 'Protect indigenous cloud forests, medicinal springs, and venerated Gudumaale ceremonial sites. Stay on marked trails and carry out all non-biodegradable waste.'
  },
  {
    icon: Users,
    title: 'Fair Support for Local Homestays & Artisans',
    description: 'Direct financial benefits to host families, local weavers, Enset growers, and certified community guides, ensuring tourism builds rural Sidama prosperity.'
  },
  {
    icon: Heart,
    title: 'Dignified Cultural Respect & Consent',
    description: 'Always request courteous permission before photographing people or ceremonies. Honor elder traditions, modest dress codes, and ceremonial protocols.'
  },
  {
    icon: Leaf,
    title: 'Preservation of Enset & Biodiversity',
    description: 'Support traditional polyculture farming, celebrate zero-emission organic agroforestry, and champion heritage Ethiopian Arabica varieties.'
  }
];

export const EcoTourismPledgeModal: React.FC<EcoTourismPledgeModalProps> = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPledged, setHasPledged] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('sidama_eco_pledge_signed');
    if (saved === 'true') {
      setHasPledged(true);
    }
  }, []);

  const handleTakePledge = () => {
    setHasPledged(true);
    localStorage.setItem('sidama_eco_pledge_signed', 'true');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button variant="outline" size="sm" className="gap-2 text-emerald-700 dark:text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Eco-Tourism Pledge</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-6 overflow-hidden">
        <DialogHeader className="pb-3 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                Eastern Sidama Eco-Tourism & Heritage Pledge
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-0.5">
                Our collective commitment to regenerative travel, cultural respect, and conservation.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-1 py-3 space-y-4">
          <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
            Visiting Eastern Sidama is a privilege of entering an ancient, living culture whose agroforestry traditions have sustained generations. By taking this pledge, you help protect these fragile ecosystems and venerate local customs.
          </div>

          <div className="space-y-3">
            {PLEDGE_PRINCIPLES.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div
                  key={index}
                  className="p-3.5 rounded-xl border border-border bg-card/60 flex items-start gap-3"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-1">
                      {principle.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Certificate / Pledge Status */}
          <div className="mt-4 p-4 rounded-xl border border-border bg-muted/40 text-center">
            {hasPledged ? (
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold text-xs border border-emerald-200 dark:border-emerald-800">
                  <Award className="w-4 h-4" />
                  <span>Verified Responsible Sidama Traveler</span>
                </div>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Thank you for promising to travel with mindfulness, environmental stewardship, and deep cultural reverence.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                <p className="text-xs text-muted-foreground">
                  Join travelers committed to preserving the heritage of the Sidama highlands.
                </p>
                <Button
                  onClick={handleTakePledge}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 text-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  I Pledge to Travel Responsibly
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EcoTourismPledgeModal;
