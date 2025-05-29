
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Star, Plus, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface SkillListing {
  id: string;
  title: string;
  description: string;
  price_per_hour: number;
  skillcoin_price: number | null;
  skills: {
    name: string;
    category: string;
  };
  profiles: {
    full_name: string;
    avatar_url: string;
  };
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [featuredSkills, setFeaturedSkills] = useState<SkillListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedSkills = async () => {
      try {
        const { data, error } = await supabase
          .from('skill_listings')
          .select(`
            id,
            title,
            description,
            price_per_hour,
            skillcoin_price,
            skills (
              name,
              category
            ),
            profiles (
              full_name,
              avatar_url
            )
          `)
          .eq('is_active', true)
          .limit(6);

        if (error) throw error;
        setFeaturedSkills(data || []);
      } catch (error) {
        console.error('Error fetching featured skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedSkills();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to SkillSwap
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Learn new skills, teach what you know, and connect with like-minded people
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              size="lg"
              onClick={() => navigate('/browse')}
            >
              <Search className="h-5 w-5 mr-2" />
              Find Skills to Learn
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/create-listing')}
            >
              <Plus className="h-5 w-5 mr-2" />
              Teach a Skill
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Skills</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +20% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Community Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,678</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">
                Based on 2,340 reviews
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Featured Skills */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Skills</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-20 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredSkills.map((skill) => (
                <Card key={skill.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{skill.title}</CardTitle>
                    <CardDescription>
                      {skill.skills?.name} • {skill.profiles?.full_name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {skill.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        ${skill.price_per_hour}/hour
                        {skill.skillcoin_price && (
                          <span className="ml-2 text-yellow-600">
                            or {skill.skillcoin_price} SC
                          </span>
                        )}
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => navigate(`/skill/${skill.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to start your learning journey?</h3>
          <p className="text-blue-100 mb-6">
            Join thousands of learners and teachers in our growing community
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => navigate('/browse')}
          >
            Explore All Skills
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
