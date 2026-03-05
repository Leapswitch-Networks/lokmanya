import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  ButtonPrimary,
  CommonBanner,
  CustomSelect,
} from "@/site/components";
// import './find.css';
import Pagination from '@/site/components/Pagination';
import DocAppointmentModal from "@/site/components/DocAppointmentModal";
import findBannerImage from "@/site/assets/images/findAdoctor/findBannerImg.png";
import PlaceholderImg from "@/site/assets/images/Dr-placeholder-img.webp";
import docBag from "@/site/assets/images/findAdoctor/doctors-bag.svg";
// import refresh from "@/site/assets/images/findAdoctor/refresh.svg";
import refresh from "@/site/assets/images/icons/Refresh-blu.svg";
import { useRouter } from 'next/router';

import Head from "next/head";
import { doctorsListFrontend, fetchAllArea, fetchAllSpecialty } from "@/ApiActions/CommonApi";
import Profilesvg1 from "@/site/assets/images/icons/CampaignPageicons/profile-clip-1.svg";
import Profilesvg2 from "@/site/assets/images/icons/CampaignPageicons/profile-clip-2.svg";
import LogoLoader from "@/components/loader/LogoLoader";
import Image from "next/image";
import DocNotFound from "@/components/Error/DocNotFound";
import Skeleton from "@/site/components/skelentonComponents/Skeleton";


const FindADoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [pagedDoctors, setPagedDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentDoctorName, setCurrentDoctorName] = useState('');
  const [currentDoctorLocation, setCurrentDoctorLocation] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [areas, setAreas] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [pageLoading, setPageLoading] = React.useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [currentDoctorSlug, setCurrentDoctorSlug] = useState('');
  // const [globalSearchVal, setGlobalSearchVal] = useState('');



  const router = useRouter();


  let location = useRouter();

  const { search } = router.query;
  const querySearchTerm = search;

  useEffect(() => {
    if (selectedLocation || selectedSpecialty) {
      // Reset location.state after filters are applied
      router.replace('/doctors');
    }
  }, [selectedLocation, selectedSpecialty]);



  const handleRefresh = () => {
    setSelectedLocation('');
    setSelectedSpecialty('');
    fetchDoctors();
    router.replace('/doctors');

    setCurrentDoctorName('');        // Re-fetch the doctors after resetting filters
  };
  const [filtersLoaded, setFiltersLoaded] = useState(false);
  // Restore filters from sessionStorage
  useEffect(() => {
    // Restore filters from sessionStorage
    const storedLocation = sessionStorage.getItem("selectedLocation");
    const storedSpecialty = sessionStorage.getItem("selectedSpecialty");

    if (storedLocation) setSelectedLocation(storedLocation);
    if (storedSpecialty) setSelectedSpecialty(storedSpecialty);


    sessionStorage.removeItem("selectedLocation");
    sessionStorage.removeItem("selectedSpecialty");


    setFiltersLoaded(true);
  }, []);



  let globalSearchVal = useMemo(() => {
    if (querySearchTerm) {
      return querySearchTerm
    };
  }, [querySearchTerm, handleRefresh])


  // Only fetch doctors after filtersLoaded is true
  useEffect(() => {
    if (filtersLoaded) {
      fetchDoctors();
    }
  }, [filtersLoaded, selectedLocation, selectedSpecialty, globalSearchVal]);

  const fetchDoctors = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await doctorsListFrontend(
        selectedLocation || "",
        selectedSpecialty || "",
        globalSearchVal
      );

      if (response.data && response.data.length > 0) {
        const doctorsData = response.data.map((doc) => {
          let firstLocation = "";
          if (doc.opdTiming) {
            try {
              const opdTiming = JSON.parse(doc.opdTiming);
              firstLocation = opdTiming?.week?.length > 0 ? opdTiming.week[0].location : "";
            } catch (error) {
              console.error("Error parsing opdTiming:", error);
            }
          }

          return {
            docId: doc.id,
            name: doc.doctorName,
            location: firstLocation,
            designation: doc.designation,
            field: doc.specialtyNames,
            exp: doc.experience ? `${doc.experience}+ Years of Experience` : "",
            image: doc.featured_images,
            bgColor: "#0077ff",
            slug: doc.slug
          };
        });

        setDoctors(doctorsData);
        setPagedDoctors(doctorsData.slice(0, itemsPerPage));
      } else {
        setDoctors([]);
      }
    } catch (err) {
      setError("Failed to fetch doctors. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [
    globalSearchVal,
    selectedLocation,
    location,
    selectedSpecialty,
    itemsPerPage,
    PlaceholderImg,
    // Optionally include the setters if your linter complains:
    // setDoctors,
    // setPagedDoctors,
    // setError,
    // setIsLoading
  ]);


  // Fetch areas data from API
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetchAllArea();
        setAreas(response.data.data);
      } catch (err) {
        setError("Failed to fetch locations. Please try again later.");
      }
    };

    fetchAreas();
  }, []);

  // Fetch specialties data from API
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await fetchAllSpecialty();
        setSpecialties(response.data);
      } catch (err) {
        setError("Failed to fetch specialties. Please try again later.");
      }
    };

    fetchSpecialties();
  }, []);

  // Update pagedDoctors when currentPage changes
  useEffect(() => {
    const firstIndex = (currentPage - 1) * itemsPerPage;
    const lastIndex = firstIndex + itemsPerPage;
    setPagedDoctors(doctors.slice(firstIndex, lastIndex));
  }, [currentPage, doctors, itemsPerPage]);

  // Re-fetch doctors data when location or specialty changes
  useEffect(() => {
    fetchDoctors();
  }, [selectedLocation, selectedSpecialty, globalSearchVal]);

  const handleModalOpen = (doctorName, doctorLocation) => {
    setCurrentDoctorName(doctorName);
    setCurrentDoctorLocation(doctorLocation);
    setIsModalOpen(true);
  };


  const handleModalClose = () => setIsModalOpen(false);



  const handleSearch = () => {
    if (currentDoctorName) {
      const selectedDoctor = doctors.find(doc => doc.name === currentDoctorName);


      if (selectedDoctor) {
        router.push(`/doctors/${selectedDoctor.slug}`);
      }
    } else {
      fetchDoctors();
    }
  };

  const handlePageChange = (page) => {
  setPageLoading(true);
  setCurrentPage(page);

  setTimeout(() => {
    setPageLoading(false);
  }, 2000);
};


  return (
    <>
      <Head>
        <title>Find The Best Doctors In Pune - Lokmanya Hospitals</title>
        <meta name="description" content="Looking for the best doctor in Pune? Discover expert care with Lokmanya Hospitals' skilled specialists across multiple fields. Your health, our priority!" />
      </Head>

      {/* Banner */}
      <CommonBanner bgColor={"#D4F2F3"} image={findBannerImage.src}>
        <div className="findDoctor career-banner-left">
          <h1 className="page-heading">FIND ME THE RIGHT DOCTOR</h1>
          <form action="" className="find-enquiryForm" onSubmit={(e) => e.preventDefault()}>
            <CustomSelect
              defaultOption="Select Location*"
              placeholder="Select Location*"

              name="location"
              options={areas.map(area => ({ label: area.masterName, value: area.masterName }))}
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
            />
            <CustomSelect
              defaultOption="Select Specialty*"
              placeholder="Select Specialty*"
              name="specialty"
              options={specialties.map(specialty => ({
                label: specialty.masterName,
                value: specialty.id,
              }))}
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            />
            <CustomSelect
              defaultOption="Select Doctor*"
              placeholder="Select Doctor"
              name="doctor"
              required
              options={
                selectedLocation || selectedSpecialty // Check if any filter is applied
                  ? doctors.map((doc) => ({
                    label: doc.name,
                    value: doc.name,
                  }))
                  : [] // Return an empty list if no filter is applied
              }
              value={currentDoctorName}
              onChange={(e) => {
                setCurrentDoctorName(e.target.value);
                const selectedDoctor = doctors.find(
                  (doc) => doc.name === e.target.value
                );
                if (selectedDoctor) {
                  setCurrentDoctorSlug(selectedDoctor.slug);
                }
              }}
            />
            <ButtonPrimary type="submit" onClick={handleSearch}>Search</ButtonPrimary>
            {/* <ButtonPrimary type="submit" onClick={handleSearch}>Search</ButtonPrimary> */}
          </form>
        </div>
      </CommonBanner>


      {/* Doctors Section */}
      <section className="section-space side-space">
        <div className="row">
          <div className="docHeading row">
            <div className="col-lg-4 col-md-4">
              <h3 className="section-heading text-start mb-0">Meet Our Expert Doctors</h3>
            </div>
            <div className="docFo col-md-8 col-lg-8">
              <form action="" className="find-enquiryForm">
                <CustomSelect
                  defaultOption="Select Location*"
                  placeholder="Select Location*"
                  required
                  name="location"
                  options={areas.map(area => ({ label: area.masterName, value: area.masterName }))}
                  value={selectedLocation}
                  onChange={e => setSelectedLocation(e.target.value)}
                />
                <CustomSelect
                  defaultOption="Select Specialty*"
                  placeholder="Select Specialty*"
                  required
                  name="specialty"
                  options={specialties.map(specialty => ({
                    label: specialty.masterName,
                    value: specialty.id,
                  }))}
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                />
                <Image width={27} height={27} style={{ cursor: "pointer" }} src={refresh.src} alt="refresh" onClick={handleRefresh} />
              </form>
            </div>
          </div>
        </div>

        {/* Loading or Error message */}
        {pagedDoctors.length == 0 && <DocNotFound />}
        {error && <p className="error-message text-center mt-1">{error}</p>}

        {/* Display Doctors when they are fetched */}

          {pageLoading ? (
          <div className="row">
            {[...Array(6)].map((_, i) => (
              <div className="col-md-6 col-lg-4 g-3" key={i}>
                <Skeleton />
              </div>
            ))}
          </div>

        ) : (
          !error && pagedDoctors.length > 0 && (
            <div className="row">
              {pagedDoctors.map((doc, index) => (
                <div className="col-md-6 col-lg-4 g-3" key={index}>
                  <div
                    className="docCard"
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push(`/doctors/${doc.slug}`)}
                  >
                    <div className="docCard-inner">
                      <div className="docImg find-doc-new">
                        <div className="prof-svg-1">
                          <Image width={100} height={100} alt={doc.name} src={Profilesvg1.src} />
                        </div>
                        <div className="prof-svg-2 find-doc-new">
                          <Image width={100} height={100} alt={doc.name} src={Profilesvg2.src} />
                        </div>
                        <img loading="lazy" src={doc.image || PlaceholderImg.src} alt={doc.name} />
                      </div>

                      <div className="content">
                        <h4>{doc.name}</h4>
                        <p>{doc.designation}</p>
                        <p>{doc.field}</p>

                        <div className="innerContent">
                          {doc.exp && (
                            <>
                              <Image width={24} height={24} src={docBag.src} alt="bag" />
                              <p className="mb-0">{doc.exp}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="btnDiv">
                      <ButtonPrimary
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentDoctorName(doc.docId);
                          handleModalOpen(doc.docId, doc.location);
                        }}
                      >
                        Book An Appointment
                      </ButtonPrimary>
                    </div>
                  </div>
                </div>
              ))}

              {doctors.length > itemsPerPage && (
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={doctors.length}
                  currentPage={currentPage}
                  setCurrentPage={handlePageChange}
                />
                  )}
                    </div>
                  )
                  )}

      </section>


      {/* Doctor Appointment Modal */}
      {isModalOpen && (
        <DocAppointmentModal
          isModalOpen={isModalOpen}
          currentDoctorName={currentDoctorName}
          selectedHospital={currentDoctorLocation}
          handleModalClose={handleModalClose}
        />
      )}

      {/* <DocAppointmentModal
 currentDoctorName={ currentDoctorName }
  isModalOpen={isModalOpen}
   handleModalClose={handleModalClose} /> */}

    </>
  );
};

export default FindADoctor;
