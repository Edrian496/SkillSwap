
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, User, LogOut, Coins } from 'lucide-react';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-blue-600">SkillSwap</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/browse')}
            >
              <Search className="h-4 w-4 mr-2" />
              Browse Skills
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/create-listing')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Teach a Skill
            </Button>

            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/profile')}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>

            <div className="flex items-center text-sm text-gray-600">
              <Coins className="h-4 w-4 mr-1 text-yellow-500" />
              <span>100 SC</span>
            </div>

            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
