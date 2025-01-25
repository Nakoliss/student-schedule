import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-white p-4">
      <div className="text-center space-y-8 max-w-2xl">
        {/* Logo */}
        <div className="w-24 h-24 mx-auto bg-primary rounded-xl flex items-center justify-center">
          <span className="text-4xl text-white font-bold">SS</span>
        </div>
        
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Synergy Scolaire
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