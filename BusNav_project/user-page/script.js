let userLocation = null;

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            userLocation = [position.coords.latitude, position.coords.longitude];
            document.getElementById('current-location').innerText = `Current Location: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
        }, () => {
            alert('Error getting current location.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function calculateDistance() {
    const destination = document.getElementById('destination').value;
    const manualLocation = document.getElementById('manual-location').value;

    if (!userLocation && !manualLocation) {
        alert('Please provide your location either manually or by getting your current location.');
        return;
    }

    if (!destination) {
        alert('Please enter a destination address.');
        return;
    }

    // Geocode manual location
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(manualLocation || '')}&format=json&limit=1`;
    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                alert('Error geocoding manual location.');
                return;
            }
            const manualLocationCoords = manualLocation ? [data[0].lat, data[0].lon] : userLocation;
            document.getElementById('current-location').innerText = `Manual Location: ${manualLocation || 'Using current location'}`;

            // Geocode destination
            const destinationUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destination)}&format=json&limit=1`;
            fetch(destinationUrl)
                .then(response => response.json())
                .then(destData => {
                    if (destData.length === 0) {
                        alert('Error geocoding destination.');
                        return;
                    }
                    const destinationCoords = [destData[0].lat, destData[0].lon];
                    calculateDistanceFromLocation(manualLocationCoords, destinationCoords);
                })
                .catch(error => {
                    console.error('Error fetching destination coordinates:', error);
                    alert('Error fetching destination coordinates.');
                });
        })
        .catch(error => {
            console.error('Error fetching manual location coordinates:', error);
            alert('Error fetching manual location coordinates.');
        });
}

function calculateDistanceFromLocation(startCoords, endCoords) {
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${startCoords.join(',')};${endCoords.join(',')}?overview=false`;
    fetch(osrmUrl)
        .then(response => response.json())
        .then(data => {
            if (!data.routes || data.routes.length === 0) {
                alert('Error calculating distance.');
                return;
            }
            const distance = data.routes[0].distance / 1000; // Convert meters to kilometers
            document.getElementById('distance').innerText = `Distance: ${distance.toFixed(2)} km`;
        })
        .catch(error => {
            console.error('Error calculating distance:', error);
            alert('Error calculating distance.');
        });
}

function scrollToDistanceCalculator() {
    const distanceCalculatorSection = document.getElementById('distance-calculator');
    if (distanceCalculatorSection) {
        distanceCalculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
}
