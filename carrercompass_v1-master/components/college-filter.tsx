"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign, Calendar, TrendingUp, Star, Users, Building, GraduationCap } from 'lucide-react';
import { getAllCountries, getStatesByCountry, getCitiesByState, getCollegesByLocation, type College } from '@/lib/career-data';

interface CollegeFilterProps {
  careerTitle: string;
}

export default function CollegeFilter({ careerTitle }: CollegeFilterProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [showColleges, setShowColleges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const countries = getAllCountries();

  useEffect(() => {
    if (selectedCountry) {
      const countryStates = getStatesByCountry(selectedCountry);
      setStates(countryStates);
      setSelectedState('');
      setSelectedCity('');
      setCities([]);
    } else {
      setStates([]);
      setSelectedState('');
      setSelectedCity('');
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      const stateCities = getCitiesByState(selectedCountry, selectedState);
      setCities(stateCities);
      setSelectedCity('');
    } else {
      setCities([]);
      setSelectedCity('');
    }
  }, [selectedCountry, selectedState]);

  const handleSearch = async () => {
    if (selectedCountry && selectedState && selectedCity) {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const filteredColleges = getCollegesByLocation(selectedCountry, selectedState, selectedCity, careerTitle);
      setColleges(filteredColleges);
      setShowColleges(true);
      setIsLoading(false);
    }
  };

  const resetSearch = () => {
    setSelectedCountry('');
    setSelectedState('');
    setSelectedCity('');
    setStates([]);
    setCities([]);
    setColleges([]);
    setShowColleges(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Find Colleges</span>
          </CardTitle>
          <CardDescription>
            Discover the best colleges for {careerTitle} in your preferred location
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Country</label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">State</label>
              <Select 
                value={selectedState} 
                onValueChange={setSelectedState}
                disabled={!selectedCountry}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">City</label>
              <Select 
                value={selectedCity} 
                onValueChange={setSelectedCity}
                disabled={!selectedState}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleSearch} 
                disabled={!selectedCountry || !selectedState || !selectedCity || isLoading}
                className="flex-1"
              >
                {isLoading ? 'Searching...' : 'Find Colleges'}
              </Button>
              {showColleges && (
                <Button variant="outline" onClick={resetSearch}>
                  Reset
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {showColleges && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              {colleges.length} College{colleges.length !== 1 ? 's' : ''} Found
            </h3>
            <div className="text-sm text-muted-foreground">
              {selectedCity}, {selectedState}, {selectedCountry}
            </div>
          </div>
          
          {colleges.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <Building className="h-12 w-12 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium mb-2">No colleges found</h3>
                    <p className="text-muted-foreground text-sm">
                      No colleges found for {careerTitle} in {selectedCity}, {selectedState}. 
                      Try selecting a different location or explore other nearby cities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {colleges.map((college) => (
                <Card key={college.id} className="card-hover overflow-hidden">
                  <div className="md:flex">
                    {/* College Image */}
                    <div className="md:w-1/3 relative h-48 md:h-auto">
                      <Image
                        src={college.image}
                        alt={college.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="bg-white/90 text-black">
                          {college.type}
                        </Badge>
                      </div>
                    </div>

                    {/* College Details */}
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <CardTitle className="text-xl mb-2">{college.name}</CardTitle>
                          <CardDescription className="flex items-center text-base">
                            <MapPin className="h-4 w-4 mr-1" />
                            {college.location}, {college.country}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-md">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{college.rating}</span>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <DollarSign className="h-5 w-5 mx-auto mb-1 text-primary" />
                          <div className="text-sm font-medium">{college.fees}</div>
                          <div className="text-xs text-muted-foreground">Annual Fees</div>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <Calendar className="h-5 w-5 mx-auto mb-1 text-primary" />
                          <div className="text-sm font-medium">{college.duration}</div>
                          <div className="text-xs text-muted-foreground">Duration</div>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <TrendingUp className="h-5 w-5 mx-auto mb-1 text-primary" />
                          <div className="text-sm font-medium">{college.placementStats.rate}</div>
                          <div className="text-xs text-muted-foreground">Placement</div>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <Building className="h-5 w-5 mx-auto mb-1 text-primary" />
                          <div className="text-sm font-medium">{college.establishedYear}</div>
                          <div className="text-xs text-muted-foreground">Established</div>
                        </div>
                      </div>

                      {/* Placement Statistics */}
                      <div className="mb-4">
                        <h4 className="font-medium mb-3 flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Placement Statistics
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div className="flex justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded">
                            <span className="text-muted-foreground">Placement Rate:</span>
                            <span className="font-medium text-green-700 dark:text-green-400">{college.placementStats.rate}</span>
                          </div>
                          <div className="flex justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                            <span className="text-muted-foreground">Average Package:</span>
                            <span className="font-medium text-blue-700 dark:text-blue-400">{college.placementStats.averagePackage}</span>
                          </div>
                          <div className="flex justify-between p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                            <span className="text-muted-foreground">Highest Package:</span>
                            <span className="font-medium text-purple-700 dark:text-purple-400">{college.placementStats.highestPackage}</span>
                          </div>
                        </div>
                      </div>

                      {/* Courses Offered */}
                      <div className="mb-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2" />
                          Courses Offered
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {college.courses.map((course, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Top Recruiters */}
                      <div className="mb-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          Top Recruiters
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {college.topRecruiters.slice(0, 5).map((recruiter, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {recruiter}
                            </Badge>
                          ))}
                          {college.topRecruiters.length > 5 && (
                            <Badge variant="secondary" className="text-xs">
                              +{college.topRecruiters.length - 5} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* College Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {college.scope}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}