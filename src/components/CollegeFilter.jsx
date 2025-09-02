import React, { useState, useEffect } from 'react';
import { MapPin, DollarSign, Calendar, TrendingUp, Star, Users, Building, GraduationCap } from 'lucide-react';
import { getAllCountries, getStatesByCountry, getCitiesByState, getCollegesByLocation } from '../data/careers';

export default function CollegeFilter({ careerTitle }) {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [colleges, setColleges] = useState([]);
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
      <div className="card">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="h-5 w-5" />
            <h3 className="text-xl font-semibold">Find Colleges</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Discover the best colleges for {careerTitle} in your preferred location
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Country</label>
              <select 
                value={selectedCountry} 
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full p-2 border border-input rounded-md bg-background"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">State</label>
              <select 
                value={selectedState} 
                onChange={(e) => setSelectedState(e.target.value)}
                disabled={!selectedCountry}
                className="w-full p-2 border border-input rounded-md bg-background disabled:opacity-50"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">City</label>
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState}
                className="w-full p-2 border border-input rounded-md bg-background disabled:opacity-50"
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={handleSearch} 
                disabled={!selectedCountry || !selectedState || !selectedCity || isLoading}
                className="btn btn-primary flex-1"
              >
                {isLoading ? 'Searching...' : 'Find Colleges'}
              </button>
              {showColleges && (
                <button onClick={resetSearch} className="btn btn-outline">
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

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
            <div className="card">
              <div className="p-8 text-center">
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
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              {colleges.map((college) => (
                <div key={college.id} className="card card-hover overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3 relative h-48 md:h-auto">
                      <img
                        src={college.image}
                        alt={college.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="badge badge-secondary bg-white/90 text-black">
                          {college.type}
                        </span>
                      </div>
                    </div>

                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{college.name}</h3>
                          <p className="flex items-center text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-1" />
                            {college.location}, {college.country}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-md">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{college.rating}</span>
                        </div>
                      </div>

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

                      <div className="mb-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2" />
                          Courses Offered
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {college.courses.map((course, index) => (
                            <span key={index} className="badge badge-outline text-xs">
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          Top Recruiters
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {college.topRecruiters.slice(0, 5).map((recruiter, index) => (
                            <span key={index} className="badge badge-secondary text-xs">
                              {recruiter}
                            </span>
                          ))}
                          {college.topRecruiters.length > 5 && (
                            <span className="badge badge-secondary text-xs">
                              +{college.topRecruiters.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {college.scope}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}