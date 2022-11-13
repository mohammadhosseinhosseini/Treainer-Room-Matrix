import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function InstructorDropDown({
    instructors,
    organizations,
    handleCheck,
}) {
    const [expanded, setExpanded] = useState('')

    const handleChangeExpanded = (newExpanded) => {
        setExpanded((pre) => (pre === newExpanded ? '' : newExpanded))
    }

    return (
        <div>
            {organizations.map((organization, index) => (
                <Accordion
                    key={index}
                    expanded={organization.id === expanded}
                    onChange={() => {
                        handleChangeExpanded(organization.id)
                    }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{organization.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            {instructors.map((instructor, index) => {
                                if (
                                    instructor.organization_id ===
                                    organization.id
                                )
                                    return (
                                        <FormControlLabel
                                            key={index}
                                            control={
                                                <Checkbox
                                                    checked={instructor.checked}
                                                    onChange={() => {
                                                        handleCheck(
                                                            instructor.id
                                                        )
                                                    }}
                                                />
                                            }
                                            label={instructor.name}
                                        />
                                    )
                            })}
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
            ))}
            {/* {data.map((inst, index) => {
                return (
                    <Accordion
                        key={index}
                        expanded={inst.id === expanded}
                        onChange={() => {
                            handleChangeExpanded(inst.id)
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{inst.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {country.cities.map((city, index) => {
                                return (
                                    <Accordion key={index}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                        >
                                            <Typography>{city.name}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <FormGroup>
                                                {city.rooms.map(
                                                    (room, index) => (
                                                        <FormControlLabel
                                                            key={index}
                                                            control={
                                                                <Checkbox
                                                                    checked={
                                                                        room.checked
                                                                    }
                                                                    onChange={() => {
                                                                        handleCheck(
                                                                            room.id
                                                                        )
                                                                    }}
                                                                />
                                                            }
                                                            label={room.name}
                                                        />
                                                    )
                                                )}
                                            </FormGroup>
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })}
                        </AccordionDetails>
                    </Accordion>
                )
            })} */}
        </div>
    )
}
