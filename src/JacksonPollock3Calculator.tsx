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
  const [site1, setSite1] = useState("");
  const [site2, setSite2] = useState("");
  const [site3, setSite3] = useState("");
  const [bodyDensity, setBodyDensity] = useState(null);
  const [bodyFat, setBodyFat] = useState(null);

  const handleCalculate = () => {
    // Convert input values to numbers
    const ageNum = parseFloat(age);
    const s1 = parseFloat(site1);
    const s2 = parseFloat(site2);
    const s3 = parseFloat(site3);

    if (isNaN(ageNum) || isNaN(s1) || isNaN(s2) || isNaN(s3)) {
      alert("Please enter valid numbers for age and skinfolds.");
      return;
    }

    // Sum of the three skinfold sites
    const sum = s1 + s2 + s3;

    let density;

    // Jackson-Pollock 3 formula for body density:
    //  For men:
    //    Body Density = 1.10938 - (0.0008267 * sum) + (0.0000016 * sum^2) - (0.0002574 * age)
    //  For women:
    //    Body Density = 1.099421 - (0.0009929 * sum) + (0.0000023 * sum^2) - (0.0001392 * age)

    if (gender === "male") {
      density =
        1.10938 -
        0.0008267 * sum +
        0.0000016 * Math.pow(sum, 2) -
        0.0002574 * ageNum;
    } else {
      density =
        1.099421 -
        0.0009929 * sum +
        0.0000023 * Math.pow(sum, 2) -
        0.0001392 * ageNum;
    }

    // Siri equation to convert body density to body fat percentage:
    // BF% = ((4.95 / Body Density) - 4.50) * 100
    const bf = (4.95 / density - 4.5) * 100;

    setBodyDensity(density.toFixed(4));
    setBodyFat(bf.toFixed(2));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Jackson-Pollock 3-Site Body Fat Calculator
      </Typography>

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

      <TextField
        label="Age"
        type="number"
        fullWidth
        margin="normal"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <TextField
        label="Site 1 (mm)"
        type="number"
        fullWidth
        margin="normal"
        value={site1}
        onChange={(e) => setSite1(e.target.value)}
      />

      <TextField
        label="Site 2 (mm)"
        type="number"
        fullWidth
        margin="normal"
        value={site2}
        onChange={(e) => setSite2(e.target.value)}
      />

      <TextField
        label="Site 3 (mm)"
        type="number"
        fullWidth
        margin="normal"
        value={site3}
        onChange={(e) => setSite3(e.target.value)}
      />

      <Box mt={2}>
        <Button variant="contained" onClick={handleCalculate}>
          Calculate Body Fat
        </Button>
      </Box>

      {bodyDensity && bodyFat && (
        <Box mt={3}>
          <Typography variant="h6">Body Density: {bodyDensity} g/cc</Typography>
          <Typography variant="h6">Body Fat Percentage: {bodyFat}%</Typography>
        </Box>
      )}
    </Container>
  );
}
