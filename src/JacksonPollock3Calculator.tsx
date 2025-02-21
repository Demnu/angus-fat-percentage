import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";

export function JacksonPollock3Calculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");

  // For each site, we will have 3 measurements to be averaged
  // Site 1 inputs
  const [site1a, setSite1a] = useState("");
  const [site1b, setSite1b] = useState("");
  const [site1c, setSite1c] = useState("");

  // Site 2 inputs
  const [site2a, setSite2a] = useState("");
  const [site2b, setSite2b] = useState("");
  const [site2c, setSite2c] = useState("");

  // Site 3 inputs
  const [site3a, setSite3a] = useState("");
  const [site3b, setSite3b] = useState("");
  const [site3c, setSite3c] = useState("");

  // Calculated outputs
  const [bodyDensity, setBodyDensity] = useState(null);
  const [bodyFat, setBodyFat] = useState(null);

  const handleCalculate = () => {
    const ageNum = parseFloat(age);

    // Convert all skinfold inputs to numbers
    // Site 1
    const s1a = parseFloat(site1a);
    const s1b = parseFloat(site1b);
    const s1c = parseFloat(site1c);
    // Site 2
    const s2a = parseFloat(site2a);
    const s2b = parseFloat(site2b);
    const s2c = parseFloat(site2c);
    // Site 3
    const s3a = parseFloat(site3a);
    const s3b = parseFloat(site3b);
    const s3c = parseFloat(site3c);

    // Validate
    if (
      isNaN(ageNum) ||
      isNaN(s1a) ||
      isNaN(s1b) ||
      isNaN(s1c) ||
      isNaN(s2a) ||
      isNaN(s2b) ||
      isNaN(s2c) ||
      isNaN(s3a) ||
      isNaN(s3b) ||
      isNaN(s3c)
    ) {
      alert("Please enter valid numeric values for all fields.");
      return;
    }

    // Average each site
    const site1Avg = (s1a + s1b + s1c) / 3;
    const site2Avg = (s2a + s2b + s2c) / 3;
    const site3Avg = (s3a + s3b + s3c) / 3;

    // Sum of the averaged skinfolds
    const sum = site1Avg + site2Avg + site3Avg;

    let density;

    // Jackson-Pollock 3 formula for body density:
    //   For men:
    //     Body Density = 1.10938
    //       - 0.0008267 * sum
    //       + 0.0000016 * sum^2
    //       - 0.0002574 * age
    //
    //   For women:
    //     Body Density = 1.099421
    //       - 0.0009929 * sum
    //       + 0.0000023 * sum^2
    //       - 0.0001392 * age

    if (gender === "male") {
      density =
        1.10938 - 0.0008267 * sum + 0.0000016 * sum * sum - 0.0002574 * ageNum;
    } else {
      density =
        1.099421 - 0.0009929 * sum + 0.0000023 * sum * sum - 0.0001392 * ageNum;
    }

    // Siri equation to convert density to BF%:
    // BF% = ((4.95 / density) - 4.50) * 100
    const bf = (4.95 / density - 4.5) * 100;

    setBodyDensity(density.toFixed(4));
    setBodyFat(bf.toFixed(2));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Jackson-Pollock 3-Site Body Fat Calculator (Averaged Measurements)
      </Typography>

      {/* Gender Selection */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          value={gender}
          label="Gender"
          onChange={(e) => setGender(e.target.value)}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>

      {/* Age Input */}
      <TextField
        label="Age"
        type="number"
        fullWidth
        margin="normal"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      {/* Site 1 Inputs */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Site 1 (3 Measurements)
      </Typography>
      <Box display="flex" gap={1}>
        <TextField
          label="Site 1 - A"
          type="number"
          value={site1a}
          onChange={(e) => setSite1a(e.target.value)}
        />
        <TextField
          label="Site 1 - B"
          type="number"
          value={site1b}
          onChange={(e) => setSite1b(e.target.value)}
        />
        <TextField
          label="Site 1 - C"
          type="number"
          value={site1c}
          onChange={(e) => setSite1c(e.target.value)}
        />
      </Box>

      {/* Site 2 Inputs */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Site 2 (3 Measurements)
      </Typography>
      <Box display="flex" gap={1}>
        <TextField
          label="Site 2 - A"
          type="number"
          value={site2a}
          onChange={(e) => setSite2a(e.target.value)}
        />
        <TextField
          label="Site 2 - B"
          type="number"
          value={site2b}
          onChange={(e) => setSite2b(e.target.value)}
        />
        <TextField
          label="Site 2 - C"
          type="number"
          value={site2c}
          onChange={(e) => setSite2c(e.target.value)}
        />
      </Box>

      {/* Site 3 Inputs */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Site 3 (3 Measurements)
      </Typography>
      <Box display="flex" gap={1}>
        <TextField
          label="Site 3 - A"
          type="number"
          value={site3a}
          onChange={(e) => setSite3a(e.target.value)}
        />
        <TextField
          label="Site 3 - B"
          type="number"
          value={site3b}
          onChange={(e) => setSite3b(e.target.value)}
        />
        <TextField
          label="Site 3 - C"
          type="number"
          value={site3c}
          onChange={(e) => setSite3c(e.target.value)}
        />
      </Box>

      {/* Calculate Button */}
      <Box mt={2}>
        <Button variant="contained" onClick={handleCalculate}>
          Calculate Body Fat
        </Button>
      </Box>

      {/* Results */}
      {bodyDensity && bodyFat && (
        <Box mt={3}>
          <Typography variant="h6">Body Density: {bodyDensity} g/cc</Typography>
          <Typography variant="h6">Body Fat Percentage: {bodyFat}%</Typography>
        </Box>
      )}
    </Container>
  );
}
