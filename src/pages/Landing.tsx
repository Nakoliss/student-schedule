import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-white p-4">
      <div className="text-center space-y-8 max-w-2xl">
        {/* Logo */}
        <div className="w-48 h-48 mx-auto">
          <img 
            src="/lovable-uploads/aa7999c2-bb97-474c-8877-97dd11d504cb.png" 
            alt="Calendrier Scolaire Logo" 
            className="w-full h-full object-contain hover:scale-105 transition-transform"
          />
        </div>
        
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Calendrier ScolaireTTTTTPPPPPP
          </h1>
          <p className="text-xl text-gray-600">
            Votre emploi du temps simplifié
          </p>
        </div>

        {/* Navigation Button */}
        <Button 
          onClick={() => navigate('/calendar')} 
          className="mt-8 text-lg px-6 py-6 h-auto"
        >
          Commencer <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Landing;