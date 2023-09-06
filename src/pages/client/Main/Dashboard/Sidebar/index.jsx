import React, { useState, useEffect } from 'react';
import { FormGroup, Accordion, AccordionSummary, AccordionDetails, Typography, Divider } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
// import { fetchLevel, fetchPosition, fetchSkillsetTypeOptions } from 'apis';

const FilterAccordion = ({ title, data, idKey, nameKey, selectedItems, onChange  }) => (
  <Accordion sx={{ backgroundColor: 'transparent', boxShadow: 'none' }} defaultExpanded>
    <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
      <Typography
        sx={{
          color: 'black',
          fontFamily: 'Poppins',
          fontSize: '14px',
          fontWeight: 700,
          lineHeight: '21px',
        }}
      >
        {title}
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <FormGroup>
        {data.map((item) => (
          <FormControlLabel
            key={item[idKey]}
            control={<Checkbox sx={{ color: '#AFAFAF' }} />}
            label={
              <Typography sx={{ color: 'black', fontFamily: 'Inter', fontSize: '14px', fontWeight: 400, lineHeight: '17px' }}>
                {item[nameKey]}
              </Typography>
            }
            onChange={() => onChange(item[idKey])}
          />
        ))}
      </FormGroup>
    </AccordionDetails>
  </Accordion>
);

const Sidebar = (
  selectedPositions,
  handlePositionFilterChange,
  selectedExperience,
  handleExperienceFilterChange,
  selectedLevels,
  handleLevelFilterChange,
  selectedSkillsets,
  handleSkillsetFilterChange
) => {
  const [skillsetTypeOptions, setSkillsetTypeOptions] = useState([]);
  const [positions, setPositions] = useState([]);
  const [levels, setLevels] = useState([]);
  const experienceLevels = [
    { id: 1, name: '5+ Years of Experience' },
    { id: 2, name: '2 - 4 Years of Experience' },
    { id: 3, name: '1 Year of Experience' },
  ];

//   useEffect(() => {
//     fetchLevel()
//       .then((response) => setLevels(response.data))
//       .catch((error) => console.error('Error fetching data:', error));

//     fetchPosition()
//       .then((response) => setPositions(response.data))
//       .catch((error) => console.error('Error fetching data:', error));

//     fetchSkillsetTypeOptions()
//       .then((response) => setSkillsetTypeOptions(response.data))
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FilterAltOutlinedIcon sx={{ color: 'black' }} />
        <Typography sx={{ color: 'black', fontFamily: 'poppins', fontSize: '20px', fontWeight: '700' }}>Filter</Typography>
      </div>

      {/* Position */}
      <FilterAccordion
        title="Position"
        data={positions}
        idKey="positionId"
        nameKey="positionName"
        selectedItems={selectedPositions}
        onChange={handlePositionFilterChange}
      />
      <Divider variant="middle" color="#DBDBDB" height="10" sx={{ mt: 3 }} />

      {/* Years of Experience */}
      <FilterAccordion
        title="Years of Experience"
        data={experienceLevels}
        idKey="id"
        nameKey="name"
        selectedItems={selectedExperience}
        onChange={handleExperienceFilterChange}
      />
      <Divider variant="middle" color="#DBDBDB" height="10" sx={{ mt: 3 }} />

      {/* Level */}
      <FilterAccordion
        title="Level"
        data={levels}
        idKey="talentLevelId"
        nameKey="talentLevelName"
        selectedItems={selectedLevels}
        onChange={handleLevelFilterChange}
      />
      <Divider variant="middle" color="#DBDBDB" height="10" sx={{ mt: 3 }} />

      {/* Skillset Grouped By Skillset Type */}
      {skillsetTypeOptions.map((skillsetType, index) => (
        <div key={skillsetType.skillsetTypeId}>
          <FilterAccordion
            title={skillsetType.skillsetTypeName}
            data={skillsetType.skillset}
            idKey="skillsetId"
            nameKey="skillsetName"
            selectedItems={selectedSkillsets}
            onChange={handleSkillsetFilterChange}
          />
          {index !== skillsetTypeOptions.length - 1 && <Divider variant="middle" color="#DBDBDB" height="10" sx={{ mt: 3 }} />}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
