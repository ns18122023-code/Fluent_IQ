/**
 * grammarData.js
 * 10 Comprehensive English Grammar Topics
 * Explanations, rules, examples, and 3 difficulty tiers (Beginner, Intermediate, Advanced)
 * with 5 practice questions per tier (150 handcrafted deterministic questions total).
 */

export const GRAMMAR_TOPICS = [
  {
    id: 'tenses',
    title: 'Tenses & Aspects',
    icon: 'Clock',
    description: 'Master present, past, future, perfect, and continuous verb forms.',
    ruleSummary: 'Tenses indicate the time of an action, while aspects indicate how that action unfolds over time (simple, continuous, perfect, perfect continuous).',
    examples: [
      { text: 'I write emails every morning.', note: 'Present Simple (habitual)' },
      { text: 'I am writing an email right now.', note: 'Present Continuous (ongoing)' },
      { text: 'I have written three emails today.', note: 'Present Perfect (experience/result)' },
      { text: 'I had written the email before she called.', note: 'Past Perfect (action prior to past point)' }
    ],
    levels: {
      beginner: [
        {
          id: 'ten_b1',
          question: 'She ___ to the gym three times a week.',
          options: ['go', 'goes', 'going', 'is go'],
          correctIndex: 1,
          explanation: "In Present Simple with third-person singular (she), add '-es' to 'go' -> 'goes'."
        },
        {
          id: 'ten_b2',
          question: 'Yesterday, they ___ football in the park until sunset.',
          options: ['play', 'played', 'playing', 'have played'],
          correctIndex: 1,
          explanation: "Specific past time markers like 'yesterday' require Past Simple ('played')."
        },
        {
          id: 'ten_b3',
          question: 'Listen! The baby ___ in the nursery.',
          options: ['cries', 'is crying', 'cried', 'cry'],
          correctIndex: 1,
          explanation: "'Listen!' signals an action happening right now, requiring Present Continuous ('is crying')."
        },
        {
          id: 'ten_b4',
          question: 'We ___ to Spain next summer for our holiday.',
          options: ['will travel', 'traveled', 'have travel', 'are traveled'],
          correctIndex: 0,
          explanation: "Future intentions or predictions use 'will travel' or 'are going to travel'."
        },
        {
          id: 'ten_b5',
          question: 'He ___ not like spicy food at all.',
          options: ['do', 'does', 'is', 'did'],
          correctIndex: 1,
          explanation: "Negative Present Simple with 'he' uses auxiliary 'does not' + base verb."
        }
      ],
      intermediate: [
        {
          id: 'ten_i1',
          question: 'I ___ for this firm since January 2021.',
          options: ['worked', 'am working', 'have been working', 'had worked'],
          correctIndex: 2,
          explanation: "'Since + starting point' with an action continuing into the present requires Present Perfect Continuous ('have been working')."
        },
        {
          id: 'ten_i2',
          question: 'By the time the ambulance arrived, the patient ___ unconscious.',
          options: ['fell', 'has fallen', 'had fallen', 'was fallen'],
          correctIndex: 2,
          explanation: "Past action completed before another past event ('arrived') uses Past Perfect ('had fallen')."
        },
        {
          id: 'ten_i3',
          question: 'At this time tomorrow, we ___ over the Atlantic ocean.',
          options: ['will fly', 'will be flying', 'fly', 'are flying'],
          correctIndex: 1,
          explanation: "Future Continuous ('will be flying') describes an ongoing action at a specific time in the future."
        },
        {
          id: 'ten_i4',
          question: 'When did you first realize you ___ your passport?',
          options: ['lost', 'have lost', 'had lost', 'were losing'],
          correctIndex: 2,
          explanation: "The loss happened prior to the realization in the past, so Past Perfect ('had lost') is appropriate."
        },
        {
          id: 'ten_i5',
          question: 'By the end of this month, she ___ here for a whole decade.',
          options: ['will live', 'will have lived', 'lived', 'has lived'],
          correctIndex: 1,
          explanation: "Future Perfect ('will have lived') indicates an action that will be completed by a specific future point."
        }
      ],
      advanced: [
        {
          id: 'ten_a1',
          question: 'Hardly ___ the building when the emergency alarm sounded.',
          options: ['had we entered', 'we entered', 'did we enter', 'we had entered'],
          correctIndex: 0,
          explanation: "Inversion with 'Hardly... when' requires 'Hardly had + subject + past participle'."
        },
        {
          id: 'ten_a2',
          question: 'The minister was believed ___ in secret negotiations prior to the summit.',
          options: ['to engage', 'to have been engaging', 'having engaged', 'engaging'],
          correctIndex: 1,
          explanation: "Perfect Continuous infinitive ('to have been engaging') expresses a prolonged activity occurring before the main reporting verb."
        },
        {
          id: 'ten_a3',
          question: 'Had it not been for your prompt intervention, we ___ the deal.',
          options: ['would forfeit', 'would have forfeited', 'had forfeited', 'forfeited'],
          correctIndex: 1,
          explanation: "Inverted third conditional: 'Had it not been for... would have forfeited'."
        },
        {
          id: 'ten_a4',
          question: 'It is essential that every applicant ___ all certificates verified.',
          options: ['has', 'have', 'had', 'should has'],
          correctIndex: 1,
          explanation: "Mandative subjunctive clause requires the base form of the verb ('have')."
        },
        {
          id: 'ten_a5',
          question: 'The committee members insisted that the project manager ___ present at the audit.',
          options: ['is', 'was', 'be', 'will be'],
          correctIndex: 2,
          explanation: "Subjunctive after 'insisted that' uses base verb 'be'."
        }
      ]
    }
  },
  {
    id: 'articles',
    title: 'Articles & Determiners',
    icon: 'FileText',
    description: 'When to use a, an, the, or the zero article correctly.',
    ruleSummary: "Use 'a/an' for non-specific singular countable nouns, 'the' for definite or unique nouns, and zero article for plural/uncountable nouns in general statements.",
    examples: [
      { text: 'A dog barked outside.', note: 'Indefinite, singular, consonant sound' },
      { text: 'An honest man.', note: "'h' is silent, starts with vowel sound" },
      { text: 'The sun rises in the east.', note: 'Unique celestial entity' },
      { text: 'Water boils at 100°C.', note: 'Zero article: uncountable noun in general sense' }
    ],
    levels: {
      beginner: [
        {
          id: 'art_b1',
          question: 'He is studying to become ___ architect.',
          options: ['a', 'an', 'the', 'no article'],
          correctIndex: 1,
          explanation: "'Architect' begins with a vowel sound, so use 'an'."
        },
        {
          id: 'art_b2',
          question: 'Look at ___ moon tonight; it is incredibly bright.',
          options: ['a', 'an', 'the', 'no article'],
          correctIndex: 2,
          explanation: "Unique entities in our world take 'the'."
        },
        {
          id: 'art_b3',
          question: 'I love drinking ___ fresh coffee in the morning.',
          options: ['a', 'an', 'the', 'no article'],
          correctIndex: 3,
          explanation: "General uncountable nouns do not take an article."
        },
        {
          id: 'art_b4',
          question: 'They stayed at ___ very comfortable hotel in Rome.',
          options: ['a', 'an', 'the', 'no article'],
          correctIndex: 0,
          explanation: "'Very' begins with a consonant sound, so use 'a'."
        },
        {
          id: 'art_b5',
          question: 'Paris is ___ capital of France.',
          options: ['a', 'an', 'the', 'no article'],
          correctIndex: 2,
          explanation: "Specific singular designation of a capital city uses 'the'."
        }
      ],
      intermediate: [
        {
          id: 'art_i1',
          question: 'She plays ___ violin with great dexterity and passion.',
          options: ['a', 'an', 'the', 'no article'],
          correctIndex: 2,
          explanation: "Musical instruments take 'the' when referring to playing them as an art."
        },
        {
          id: 'art_i2',
          question: 'He graduated from ___ University of Oxford with honors.',
          options: ['a', 'an', 'the', 'no article'],
          correctIndex: 2,
          explanation: "Institutions formatted as 'The University of [Place]' take 'the' (unlike 'Oxford University')."
        },
        {
          id: 'art_i3',
          question: '___ Mount Everest is the highest peak in the Himalayas.',
          options: ['A', 'An', 'The', 'No article'],
          correctIndex: 3,
          explanation: "Individual mountain peaks take zero article ('Mount Everest'), whereas mountain ranges take 'the' ('The Himalayas')."
        },
        {
          id: 'art_i4',
          question: 'We need to help ___ unemployed find dignified work.',
          options: ['a', 'an', 'the', 'no article'],
          correctIndex: 2,
          explanation: "'The + adjective' forms a collective noun referring to a group of people ('the unemployed', 'the elderly')."
        },
        {
          id: 'art_i5',
          question: 'It took him nearly ___ hour and a half to finish the exam.',
          options: ['a', 'an', 'the', 'no article'],
          correctIndex: 1,
          explanation: "'Hour' begins with a silent 'h', giving a vowel sound: 'an hour'."
        }
      ],
      advanced: [
        {
          id: 'art_a1',
          question: 'He was appointed ___ chairman of the advisory board.',
          options: ['a', 'an', 'the', 'no article'],
          correctIndex: 3,
          explanation: "When a unique title or post follows verbs like 'appoint', 'elect', or 'make', the zero article is preferred in formal English."
        },
        {
          id: 'art_a2',
          question: '___ Netherlands is renowned for its progressive infrastructure.',
          options: ['A', 'An', 'The', 'No article'],
          correctIndex: 2,
          explanation: "Plural country names take 'The' ('The Netherlands', 'The Philippines')."
        },
        {
          id: 'art_a3',
          question: 'The deeper ___ inquiry into the scandal, the more inconsistencies emerged.',
          options: ['a', 'an', 'the', 'no article'],
          correctIndex: 2,
          explanation: "Comparative correlative structures take 'The... the...' ('The deeper the inquiry, the more...')."
        },
        {
          id: 'art_a4',
          question: 'He went to ___ prison to interview the inmate for his investigative biography.',
          options: ['a', 'an', 'the', 'no article'],
          correctIndex: 2,
          explanation: "When visiting a prison as an outsider rather than being an inmate, 'the' is used ('went to the prison')."
        },
        {
          id: 'art_a5',
          question: 'She possesses ___ profound knowledge of international maritime law.',
          options: ['a', 'an', 'the', 'no article'],
          correctIndex: 0,
          explanation: "Although 'knowledge' is uncountable, when qualified by a descriptive adjective ('profound knowledge of...'), it takes the indefinite article 'a'."
        }
      ]
    }
  },
  {
    id: 'prepositions',
    title: 'Prepositions & Phrasal Verbs',
    icon: 'Compass',
    description: 'Prepositions of time, place, direction, and dependent combinations.',
    ruleSummary: "Prepositions show relationships between nouns and other words. Dependent prepositions attach to specific adjectives, nouns, or verbs.",
    examples: [
      { text: 'Interested in art', note: 'Adjective + dependent preposition' },
      { text: 'Rely on friends', note: 'Verb + dependent preposition' },
      { text: 'Arrive at the station', note: 'Specific point/place' },
      { text: 'In July / On Monday / At noon', note: 'Time hierarchy (broad to exact)' }
    ],
    levels: {
      beginner: [
        {
          id: 'prep_b1',
          question: 'The laptop is resting ___ the wooden table.',
          options: ['in', 'on', 'at', 'into'],
          correctIndex: 1,
          explanation: "Surface contact uses 'on'."
        },
        {
          id: 'prep_b2',
          question: 'Our flight departs ___ 6:30 in the morning.',
          options: ['at', 'in', 'on', 'by'],
          correctIndex: 0,
          explanation: "Specific clock times use 'at'."
        },
        {
          id: 'prep_b3',
          question: 'She is very good ___ speaking foreign languages.',
          options: ['in', 'at', 'with', 'for'],
          correctIndex: 1,
          explanation: "The idiom is 'good at' an activity or skill."
        },
        {
          id: 'prep_b4',
          question: 'We walked ___ the park to enjoy the spring flowers.',
          options: ['through', 'at', 'on', 'of'],
          correctIndex: 0,
          explanation: "Movement inside a three-dimensional area uses 'through'."
        },
        {
          id: 'prep_b5',
          question: 'He was born ___ November 14th.',
          options: ['in', 'on', 'at', 'from'],
          correctIndex: 1,
          explanation: "Specific dates use 'on'."
        }
      ],
      intermediate: [
        {
          id: 'prep_i1',
          question: 'He was accused ___ leaking proprietary design blueprints.',
          options: ['for', 'of', 'with', 'about'],
          correctIndex: 1,
          explanation: "The verb 'accuse' takes the dependent preposition 'of'."
        },
        {
          id: 'prep_i2',
          question: 'Despite their differences, she congratulated him ___ his promotion.',
          options: ['for', 'on', 'to', 'about'],
          correctIndex: 1,
          explanation: "The standard English idiom is 'congratulate someone ON something'."
        },
        {
          id: 'prep_i3',
          question: 'The executive apologized ___ the stakeholders ___ the unforeseen delay.',
          options: ['to / for', 'with / about', 'at / on', 'towards / with'],
          correctIndex: 0,
          explanation: "'Apologize TO a person FOR a situation'."
        },
        {
          id: 'prep_i4',
          question: 'The new regulations are completely incompatible ___ our existing workflow.',
          options: ['with', 'to', 'from', 'against'],
          correctIndex: 0,
          explanation: "'Incompatible' pairs with 'with'."
        },
        {
          id: 'prep_i5',
          question: 'They succeeded ___ securing the venture funding after three pitch rounds.',
          options: ['in', 'at', 'to', 'for'],
          correctIndex: 0,
          explanation: "'Succeed' takes 'in + gerund' ('succeeded in securing')."
        }
      ],
      advanced: [
        {
          id: 'prep_a1',
          question: 'His reckless conduct was tantamount ___ a betrayal of the board’s trust.',
          options: ['with', 'to', 'for', 'at'],
          correctIndex: 1,
          explanation: "'Tantamount' always takes the preposition 'to'."
        },
        {
          id: 'prep_a2',
          question: 'The researcher was oblivious ___ the ethical implications of the algorithmic bias.',
          options: ['of', 'to', 'about', 'with'],
          correctIndex: 1,
          explanation: "In standard formal English, 'oblivious' takes 'to' (or sometimes 'of'). 'Oblivious to' is the primary standard."
        },
        {
          id: 'prep_a3',
          question: 'The company was exempt ___ paying local municipal levies under the special treaty.',
          options: ['from', 'of', 'with', 'off'],
          correctIndex: 0,
          explanation: "'Exempt' takes 'from'."
        },
        {
          id: 'prep_a4',
          question: 'She took exception ___ his disparaging remarks regarding the team’s productivity.',
          options: ['to', 'with', 'at', 'against'],
          correctIndex: 0,
          explanation: "The idiom 'to take exception to' means to object strongly to something."
        },
        {
          id: 'prep_a5',
          question: 'His arguments were deficient ___ both empirical rigor and theoretical clarity.',
          options: ['in', 'of', 'with', 'from'],
          correctIndex: 0,
          explanation: "'Deficient' takes the preposition 'in' ('deficient in nutrients/rigor')."
        }
      ]
    }
  },
  {
    id: 'subject_verb_agreement',
    title: 'Subject-Verb Agreement',
    icon: 'Scale',
    description: 'Ensure singular and plural subjects match their verbs in complex sentences.',
    ruleSummary: "Singular subjects take singular verbs; plural subjects take plural verbs. Watch out for intervening prepositional phrases, collective nouns, and compound conjunctions.",
    examples: [
      { text: 'The list of items is on the desk.', note: "'List' is the singular subject, not 'items'" },
      { text: 'Neither the teacher nor the students were ready.', note: "Closer subject 'students' is plural" },
      { text: 'Every student and teacher was present.', note: "'Every' makes the subject singular" }
    ],
    levels: {
      beginner: [
        {
          id: 'sva_b1',
          question: 'The cat ___ sleeping on the cozy rug.',
          options: ['is', 'are', 'were', 'be'],
          correctIndex: 0,
          explanation: "'The cat' is singular, requiring 'is'."
        },
        {
          id: 'sva_b2',
          question: 'They ___ planning a road trip across the country.',
          options: ['is', 'are', 'was', 'has'],
          correctIndex: 1,
          explanation: "'They' is plural, requiring 'are'."
        },
        {
          id: 'sva_b3',
          question: 'My sister ___ two languages fluently.',
          options: ['speak', 'speaks', 'speaking', 'are speaking'],
          correctIndex: 1,
          explanation: "Third-person singular 'sister' takes 'speaks'."
        },
        {
          id: 'sva_b4',
          question: 'There ___ many books on the library shelf.',
          options: ['is', 'are', 'was', 'has'],
          correctIndex: 1,
          explanation: "In 'there are', the real subject is 'many books' (plural)."
        },
        {
          id: 'sva_b5',
          question: 'Each student ___ given a commemorative badge.',
          options: ['was', 'were', 'are', 'have'],
          correctIndex: 0,
          explanation: "'Each' is grammatically singular and takes 'was'."
        }
      ],
      intermediate: [
        {
          id: 'sva_i1',
          question: 'A bouquet of yellow roses ___ delivered to her doorstep this morning.',
          options: ['was', 'were', 'are', 'have been'],
          correctIndex: 0,
          explanation: "The true subject is 'bouquet' (singular), not 'roses'."
        },
        {
          id: 'sva_i2',
          question: 'Either the CEO or her senior advisors ___ attending the symposium.',
          options: ['is', 'are', 'was', 'has been'],
          correctIndex: 1,
          explanation: "With 'either... or', the verb matches the closer subject: 'advisors' (plural)."
        },
        {
          id: 'sva_i3',
          question: 'The team ___ celebrating their respective milestones tonight.',
          options: ['is', 'are', 'has', 'was'],
          correctIndex: 1,
          explanation: "When members of a collective noun act as individuals ('their respective milestones'), plural 'are' is used."
        },
        {
          id: 'sva_i4',
          question: 'Ten miles ___ too far for an untrained runner to jog in one go.',
          options: ['is', 'are', 'were', 'have been'],
          correctIndex: 0,
          explanation: "Quantities of distance, money, or time considered as a single unit take singular verbs ('Ten miles is')."
        },
        {
          id: 'sva_i5',
          question: 'Every boy and girl in the academy ___ expected to participate.',
          options: ['is', 'are', 'were', 'have been'],
          correctIndex: 0,
          explanation: "Subjects preceded by 'every' or 'each' always take a singular verb."
        }
      ],
      advanced: [
        {
          id: 'sva_a1',
          question: 'The committee, along with its sub-panels and legal counselors, ___ convened.',
          options: ['has', 'have', 'are', 'were'],
          correctIndex: 0,
          explanation: "Phrases like 'along with', 'as well as', and 'in addition to' do not compound the grammatical subject; 'The committee' remains singular."
        },
        {
          id: 'sva_a2',
          question: 'One of the most persistent issues that ___ the automotive sector is chip shortages.',
          options: ['plagues', 'plague', 'has plagued', 'is plaguing'],
          correctIndex: 1,
          explanation: "In 'one of the [plural noun] that...', the relative pronoun 'that' refers to 'issues' (plural), so 'plague' is correct."
        },
        {
          id: 'sva_a3',
          question: 'More than one candidate ___ questioned the fairness of the electoral process.',
          options: ['has', 'have', 'are', 'were'],
          correctIndex: 0,
          explanation: "Idiomatically, 'more than one + singular noun' takes a singular verb ('has')."
        },
        {
          id: 'sva_a4',
          question: 'A large proportion of the delegates ___ voted against the motion.',
          options: ['has', 'have', 'was', 'is'],
          correctIndex: 1,
          explanation: "When 'proportion of' refers to countable plural individuals ('delegates'), the verb is plural ('have')."
        },
        {
          id: 'sva_a5',
          question: 'Neither the statistical models nor the empirical observation ___ sufficient proof.',
          options: ['provide', 'provides', 'are providing', 'have provided'],
          correctIndex: 1,
          explanation: "The closer subject 'the empirical observation' is singular, so it takes 'provides'."
        }
      ]
    }
  },
  {
    id: 'active_passive_voice',
    title: 'Active & Passive Voice',
    icon: 'RefreshCw',
    description: 'Transform sentences between active and passive to vary tone and emphasis.',
    ruleSummary: "Passive voice (be + past participle) shifts emphasis from the doer of the action to the recipient. Use passive when the agent is unknown, obvious, or less important.",
    examples: [
      { text: 'Active: The engineer fixed the software bug.', note: 'Doer is subject' },
      { text: 'Passive: The software bug was fixed by the engineer.', note: 'Receiver is subject' },
      { text: 'Passive without agent: The bridge was constructed in 1924.', note: 'Agent omitted' }
    ],
    levels: {
      beginner: [
        {
          id: 'ap_b1',
          question: 'Transform to passive: "Shakespeare wrote Hamlet."',
          options: [
            'Hamlet was written by Shakespeare.',
            'Hamlet is written by Shakespeare.',
            'Shakespeare was written Hamlet.',
            'Hamlet has been wrote by Shakespeare.'
          ],
          correctIndex: 0,
          explanation: "Past simple active ('wrote') becomes past simple passive ('was written')."
        },
        {
          id: 'ap_b2',
          question: 'The delicious cake ___ baked by my grandmother yesterday.',
          options: ['was', 'is', 'has', 'did'],
          correctIndex: 0,
          explanation: "Singular past passive requires 'was + past participle'."
        },
        {
          id: 'ap_b3',
          question: 'Active: "Thousands of tourists visit the museum daily." Passive: The museum ___ by thousands of tourists daily.',
          options: ['is visited', 'was visited', 'has visited', 'visited'],
          correctIndex: 0,
          explanation: "Present simple active ('visit') becomes present simple passive ('is visited')."
        },
        {
          id: 'ap_b4',
          question: 'The missing keys ___ found under the sofa this morning.',
          options: ['was', 'were', 'have', 'are'],
          correctIndex: 1,
          explanation: "'Keys' is plural, requiring 'were found'."
        },
        {
          id: 'ap_b5',
          question: 'Which sentence is in PASSIVE voice?',
          options: [
            'The dog chased the squirrel.',
            'The chef prepared a delightful dinner.',
            'The package was delivered on time.',
            'She painted a picturesque landscape.'
          ],
          correctIndex: 2,
          explanation: "'The package was delivered' has the object of the action as the grammatical subject."
        }
      ],
      intermediate: [
        {
          id: 'ap_i1',
          question: 'Active: "They are renovating the old theatre." Passive: The old theatre ___ .',
          options: [
            'is being renovated',
            'was renovated',
            'is renovated',
            'has been renovating'
          ],
          correctIndex: 0,
          explanation: "Present continuous active becomes present continuous passive: 'is being + past participle'."
        },
        {
          id: 'ap_i2',
          question: 'Active: "The committee has approved the revised budget." Passive: The revised budget ___ by the committee.',
          options: [
            'has approved',
            'has been approved',
            'was approved',
            'is being approved'
          ],
          correctIndex: 1,
          explanation: "Present perfect passive: 'has been approved'."
        },
        {
          id: 'ap_i3',
          question: 'Passivize: "Someone had already locked the security gates."',
          options: [
            'The security gates had already locked.',
            'The security gates had already been locked.',
            'The security gates were locked already by someone.',
            'The security gates have already been locked.'
          ],
          correctIndex: 1,
          explanation: "Past perfect passive: 'had already been locked'."
        },
        {
          id: 'ap_i4',
          question: 'Modal passive: "You must complete the registration form before 5 PM."',
          options: [
            'The registration form must be completed before 5 PM.',
            'The registration form must completed before 5 PM.',
            'The registration form was completed before 5 PM.',
            'The registration form must have completed before 5 PM.'
          ],
          correctIndex: 0,
          explanation: "Modal passive structure is 'modal + be + past participle'."
        },
        {
          id: 'ap_i5',
          question: 'Which sentence avoids an awkward passive structure?',
          options: [
            'A decision was arrived at by us.',
            'We arrived at a decision.',
            'A decision had been reached by our arrival.',
            'By us was the decision decided.'
          ],
          correctIndex: 1,
          explanation: "Active voice ('We arrived at a decision') is direct, vigorous, and natural."
        }
      ],
      advanced: [
        {
          id: 'ap_a1',
          question: 'Reported passive: "People believe that the CEO concealed the financial deficit."',
          options: [
            'The CEO is believed to have concealed the financial deficit.',
            'The CEO was believed concealing the deficit.',
            'It is believed the CEO to conceal the deficit.',
            'The deficit had been believed concealed.'
          ],
          correctIndex: 0,
          explanation: "Subject + passive reporting verb + perfect infinitive ('is believed to have concealed')."
        },
        {
          id: 'ap_a2',
          question: 'Convert to passive: "They saw him slip the USB drive into his pocket."',
          options: [
            'He was seen to slip the USB drive into his pocket.',
            'He was seen slip the USB drive into his pocket.',
            'He was seen slipped the USB drive.',
            'The USB drive saw him slip it.'
          ],
          correctIndex: 0,
          explanation: "Verbs of perception take a bare infinitive in the active ('saw him slip'), but require a full infinitive with 'to' in the passive ('was seen TO slip')."
        },
        {
          id: 'ap_a3',
          question: 'Causative passive: "The architect ___ the blueprints reviewed by the structural engineer."',
          options: ['had', 'got to', 'made', 'did'],
          correctIndex: 0,
          explanation: "'Have/Had something done' is the standard causative passive: 'had the blueprints reviewed'."
        },
        {
          id: 'ap_a4',
          question: 'Passive with ditransitive verb: "They awarded Professor Davis a distinguished medal."',
          options: [
            'Professor Davis was awarded a distinguished medal.',
            'A distinguished medal was awarded Professor Davis.',
            'Professor Davis was awarding a medal.',
            'A distinguished medal awarded to Davis.'
          ],
          correctIndex: 0,
          explanation: "The indirect object 'Professor Davis' becomes the natural passive subject: 'Professor Davis was awarded...'"
        },
        {
          id: 'ap_a5',
          question: 'Which of the following demonstrates an ergative/middle voice verb rather than a standard passive?',
          options: [
            'The novel was published in London.',
            'The newly published thriller sold over a million copies.',
            'The thriller was bought by avid readers.',
            'The book was written during the pandemic.'
          ],
          correctIndex: 1,
          explanation: "'The thriller sold over a million copies' uses 'sell' ergatively (active form with passive sense)."
        }
      ]
    }
  },
  {
    id: 'direct_indirect_speech',
    title: 'Direct & Indirect Speech',
    icon: 'MessageSquare',
    description: 'Learn tense backshifting, pronoun conversions, and reporting verbs.',
    ruleSummary: "When converting direct speech into indirect speech, verbs generally shift one step back in time, pronouns change to match context, and time/place adverbs shift.",
    examples: [
      { text: '"I am tired," he said. -> He said that he was tired.', note: 'Present -> Past' },
      { text: '"I will help," she said. -> She said she would help.', note: 'will -> would' },
      { text: '"Did you finish?" he asked. -> He asked if I had finished.', note: 'Yes/No question -> if/whether' }
    ],
    levels: {
      beginner: [
        {
          id: 'rep_b1',
          question: 'Direct: "I like reading history novels," Tom said. Indirect: Tom said that he ___ reading history novels.',
          options: ['liked', 'likes', 'will like', 'is liking'],
          correctIndex: 0,
          explanation: "Present simple ('like') backshifts to past simple ('liked')."
        },
        {
          id: 'rep_b2',
          question: 'Direct: "I can swim very well," Maria said. Indirect: Maria said that she ___ swim very well.',
          options: ['could', 'can', 'will can', 'might'],
          correctIndex: 0,
          explanation: "'Can' backshifts to 'could'."
        },
        {
          id: 'rep_b3',
          question: 'Direct: "We will leave tomorrow," they said. Indirect: They said they would leave ___ .',
          options: ['the next day', 'tomorrow', 'yesterday', 'that day'],
          correctIndex: 0,
          explanation: "'Tomorrow' shifts to 'the next day' or 'the following day' in indirect speech."
        },
        {
          id: 'rep_b4',
          question: 'She asked me, "Where do you live?" Indirect: She asked me where I ___ .',
          options: ['lived', 'did live', 'am living', 'do live'],
          correctIndex: 0,
          explanation: "In indirect questions, word order becomes statement order (subject + verb) with tense backshift: 'where I lived'."
        },
        {
          id: 'rep_b5',
          question: 'Direct: "Don’t shout!" the teacher said. Indirect: The teacher told us ___ .',
          options: ['not to shout', 'don’t shout', 'to not shouting', 'not shouting'],
          correctIndex: 0,
          explanation: "Negative imperatives become 'not to + infinitive'."
        }
      ],
      intermediate: [
        {
          id: 'rep_i1',
          question: 'Direct: "Have you seen my glasses?" father asked. Indirect: Father asked ___ his glasses.',
          options: [
            'if I had seen',
            'did I see',
            'if have I seen',
            'that I saw'
          ],
          correctIndex: 0,
          explanation: "Yes/no questions use 'if' or 'whether' followed by subject + backshifted verb ('had seen')."
        },
        {
          id: 'rep_i2',
          question: 'Direct: "I didn’t break the porcelain vase!" Mark insisted. Indirect: Mark denied ___ the porcelain vase.',
          options: [
            'breaking',
            'to break',
            'broken',
            'that to break'
          ],
          correctIndex: 0,
          explanation: "The reporting verb 'deny' takes a gerund ('denied breaking') or a 'that' clause."
        },
        {
          id: 'rep_i3',
          question: 'Direct: "Why don’t we organize a study group?" Sarah suggested. Indirect: Sarah suggested ___ a study group.',
          options: [
            'organizing',
            'to organize',
            'us to organize',
            'organized'
          ],
          correctIndex: 0,
          explanation: "'Suggest' never takes 'to + infinitive' with a personal pronoun. It takes a gerund ('suggested organizing') or a subjunctive 'that' clause."
        },
        {
          id: 'rep_i4',
          question: 'Direct: "I must finish this assignment tonight," she said. Indirect: She said that she ___ that assignment that night.',
          options: [
            'had to finish',
            'must to finish',
            'has to finish',
            'must have finished'
          ],
          correctIndex: 0,
          explanation: "'Must' expressing obligation backshifts to 'had to'."
        },
        {
          id: 'rep_i5',
          question: 'Direct: "Water boils at 100 degrees Celsius," the professor noted. Indirect: The professor noted that water ___ at 100 degrees Celsius.',
          options: [
            'boils',
            'boiled',
            'was boiling',
            'had boiled'
          ],
          correctIndex: 0,
          explanation: "Scientific truths and universal laws do not backshift their tense in reported speech."
        }
      ],
      advanced: [
        {
          id: 'rep_a1',
          question: 'Direct: "If I were you, I would consult a tax attorney," Liam advised. Indirect: Liam advised me ___ a tax attorney.',
          options: [
            'to consult',
            'that I consult',
            'consulting',
            'to have consulted'
          ],
          correctIndex: 0,
          explanation: "'Advise + object + to-infinitive': 'advised me to consult'."
        },
        {
          id: 'rep_a2',
          question: 'Direct: "I will definitely pay you back by Friday," David promised. Indirect: David promised ___ back by Friday.',
          options: [
            'to pay me',
            'paying me',
            'that he pays me',
            'for paying me'
          ],
          correctIndex: 0,
          explanation: "'Promise' takes 'to-infinitive': 'promised to pay me back'."
        },
        {
          id: 'rep_a3',
          question: 'Direct: "You caused the server outage!" the CTO exclaimed. Indirect: The CTO accused him ___ the server outage.',
          options: [
            'of causing',
            'for causing',
            'to cause',
            'having caused'
          ],
          correctIndex: 0,
          explanation: "'Accuse + object + of + gerund': 'accused him of causing'."
        },
        {
          id: 'rep_a4',
          question: 'Direct: "Shall we proceed with the merger?" the CFO wondered. Indirect: The CFO wondered ___ they should proceed with the merger.',
          options: [
            'whether',
            'that',
            'if so',
            'what'
          ],
          correctIndex: 0,
          explanation: "Deliberative 'shall we' in questions is reported with 'whether... should'."
        },
        {
          id: 'rep_a5',
          question: 'Direct: "Let’s take a ten-minute recess," the chairman proposed. Indirect: The chairman proposed that they ___ a ten-minute recess.',
          options: [
            'take',
            'took',
            'taking',
            'will take'
          ],
          correctIndex: 0,
          explanation: "'Propose that + subject + subjunctive base verb' ('that they take')."
        }
      ]
    }
  },
  {
    id: 'modals',
    title: 'Modal Auxiliaries',
    icon: 'Shield',
    description: 'Express ability, permission, obligation, advice, deduction, and certainty.',
    ruleSummary: "Modals (can, could, may, might, must, shall, should, will, would) modify the meaning of the main verb and never change form for person or tense.",
    examples: [
      { text: 'You must submit the report today.', note: 'Strong obligation' },
      { text: 'She might be in the library.', note: 'Possibility' },
      { text: 'He can speak four languages.', note: 'Ability' },
      { text: 'You should visit a doctor.', note: 'Recommendation/Advice' }
    ],
    levels: {
      beginner: [
        {
          id: 'mod_b1',
          question: 'You ___ wear a seatbelt while driving; it is the law.',
          options: ['must', 'might', 'could', 'may'],
          correctIndex: 0,
          explanation: "Legal obligation is expressed by 'must'."
        },
        {
          id: 'mod_b2',
          question: '___ I open the window? It feels quite stuffy in here.',
          options: ['May', 'Must', 'Should to', 'Ought'],
          correctIndex: 0,
          explanation: "'May I' or 'Can I' is used for polite permission requests."
        },
        {
          id: 'mod_b3',
          question: 'She ___ play the piano exceptionally well when she was ten.',
          options: ['could', 'can', 'may', 'must'],
          correctIndex: 0,
          explanation: "Past general ability uses 'could'."
        },
        {
          id: 'mod_b4',
          question: 'You ___ eat so much sugary junk food; it is bad for your health.',
          options: ['should not', 'might not', 'could not', 'must to not'],
          correctIndex: 0,
          explanation: "Negative advice uses 'should not'."
        },
        {
          id: 'mod_b5',
          question: 'Take an umbrella with you; it ___ rain later this afternoon.',
          options: ['might', 'must', 'ought', 'shall'],
          correctIndex: 0,
          explanation: "Uncertain future possibility uses 'might' or 'may'."
        }
      ],
      intermediate: [
        {
          id: 'mod_i1',
          question: 'The meeting was cancelled, so we ___ prepare the presentation after all.',
          options: ["didn't need to", "mustn't", "couldn't have", "ought not"],
          correctIndex: 0,
          explanation: "'Didn't need to' means the necessity did not exist, so the action was not performed."
        },
        {
          id: 'mod_i2',
          question: 'Her lights are on, but nobody answers the door. She ___ be sleeping.',
          options: ['must', 'should', 'can', 'ought'],
          correctIndex: 0,
          explanation: "Logical deduction of high probability uses 'must'."
        },
        {
          id: 'mod_i3',
          question: 'You ___ told me you were vegan; I wouldn’t have cooked steak!',
          options: ['should have', 'must have', 'would have', 'could'],
          correctIndex: 0,
          explanation: "'Should have + past participle' expresses criticism or regret about past unfulfilled expectations."
        },
        {
          id: 'mod_i4',
          question: 'He ___ run a marathon in under three hours before his knee surgery.',
          options: ['was able to', 'could', 'might', 'must'],
          correctIndex: 1,
          explanation: "General past ability is expressed with 'could'."
        },
        {
          id: 'mod_i5',
          question: 'You ___ park here; this spot is reserved exclusively for ambulances.',
          options: ["mustn't", "don't have to", "needn't", "might not"],
          correctIndex: 0,
          explanation: "'Mustn't' expresses absolute prohibition, whereas 'don't have to' merely indicates lack of necessity."
        }
      ],
      advanced: [
        {
          id: 'mod_a1',
          question: 'The encrypted hard drive was locked in a safe; the thief ___ cracked the code without the cipher key.',
          options: ["can't have", "must not have", "shouldn't have", "needn't have"],
          correctIndex: 0,
          explanation: "'Can't have + past participle' expresses logical impossibility in the past."
        },
        {
          id: 'mod_a2',
          question: 'We bought tickets in advance, but admission was completely free. We ___ purchased them.',
          options: ["needn't have", "didn't need to have", "couldn't have", "mustn't have"],
          correctIndex: 0,
          explanation: "'Needn't have + past participle' means an action was performed, but proved entirely unnecessary in retrospect."
        },
        {
          id: 'mod_a3',
          question: '___ you happen to bump into Jonathan at the conference, please give him my regards.',
          options: ['Should', 'Could', 'Might', 'Would'],
          correctIndex: 0,
          explanation: "Inverted first conditional: 'Should you happen to...' expresses an unlikely hypothetical event."
        },
        {
          id: 'mod_a4',
          question: 'He would sit by the window for hours, staring out at the sea. What does "would" express here?',
          options: ['Past habitual action', 'Hypothetical condition', 'Future in the past', 'Reluctance'],
          correctIndex: 0,
          explanation: "'Would' expresses characteristic past habitual behavior (similar to 'used to')."
        },
        {
          id: 'mod_a5',
          question: 'Dare she ___ the senior partner regarding the calculation discrepancies?',
          options: ['confront', 'to confront', 'confronts', 'confronted'],
          correctIndex: 0,
          explanation: "When 'dare' is used as a modal auxiliary in questions and negatives, it takes a bare infinitive ('confront')."
        }
      ]
    }
  },
  {
    id: 'conjunctions',
    title: 'Conjunctions & Connectors',
    icon: 'Link',
    description: 'Link clauses, contrast ideas, and express cause, condition, and concession.',
    ruleSummary: "Coordinating conjunctions (FANBOYS) link equal elements; subordinating conjunctions introduce dependent clauses; correlative conjunctions work in pairs.",
    examples: [
      { text: 'She was exhausted, yet she persevered.', note: 'Contrast (coordinating)' },
      { text: 'Although it rained, we enjoyed the concert.', note: 'Concession (subordinating)' },
      { text: 'Not only is he intelligent, but he is also modest.', note: 'Correlative pair' }
    ],
    levels: {
      beginner: [
        {
          id: 'conj_b1',
          question: 'I wanted to buy the dress, ___ it was too expensive.',
          options: ['but', 'and', 'so', 'because'],
          correctIndex: 0,
          explanation: "'But' shows contrast between wanting to buy and high price."
        },
        {
          id: 'conj_b2',
          question: 'He stayed at home ___ he was running a high fever.',
          options: ['because', 'although', 'so', 'while'],
          correctIndex: 0,
          explanation: "'Because' gives the reason for staying home."
        },
        {
          id: 'conj_b3',
          question: 'We can go to the beach ___ we can visit the art museum.',
          options: ['or', 'nor', 'but', 'yet'],
          correctIndex: 0,
          explanation: "'Or' presents two alternatives."
        },
        {
          id: 'conj_b4',
          question: 'It was freezing outside, ___ we wore heavy winter coats.',
          options: ['so', 'because', 'or', 'although'],
          correctIndex: 0,
          explanation: "'So' connects a cause to its logical result."
        },
        {
          id: 'conj_b5',
          question: '___ she was tired, she finished her homework before going to bed.',
          options: ['Although', 'Because', 'Since', 'So'],
          correctIndex: 0,
          explanation: "'Although' introduces a concessive clause."
        }
      ],
      intermediate: [
        {
          id: 'conj_i1',
          question: '___ the torrential downpour, the outdoor marathon proceeded as scheduled.',
          options: ['Despite', 'Although', 'Even though', 'Whereas'],
          correctIndex: 0,
          explanation: "'Despite' is followed by a noun phrase ('the torrential downpour'), unlike 'although' which requires a full clause."
        },
        {
          id: 'conj_i2',
          question: 'You can borrow my car ___ you return it with a full tank of petrol.',
          options: ['as long as', 'unless', 'in case', 'even if'],
          correctIndex: 0,
          explanation: "'As long as' or 'provided that' introduces a mandatory condition."
        },
        {
          id: 'conj_i3',
          question: 'He won’t pass the certification exam ___ he studies consistently.',
          options: ['unless', 'if', 'as long as', 'since'],
          correctIndex: 0,
          explanation: "'Unless' means 'if not' ('unless he studies' = 'if he does not study')."
        },
        {
          id: 'conj_i4',
          question: 'Take an umbrella ___ it rains later.',
          options: ['in case', 'so that', 'unless', 'although'],
          correctIndex: 0,
          explanation: "'In case' explains taking a precaution against a possible future occurrence."
        },
        {
          id: 'conj_i5',
          question: 'He is not only an accomplished pianist ___ a talented composer.',
          options: ['but also', 'and also', 'as well as', 'too'],
          correctIndex: 0,
          explanation: "'Not only' pairs with 'but also'."
        }
      ],
      advanced: [
        {
          id: 'conj_a1',
          question: '___ had she submitted her dissertation than she received an invitation for a postdoctoral fellowship.',
          options: ['No sooner', 'Hardly', 'Scarcely', 'Barely'],
          correctIndex: 0,
          explanation: "'No sooner' pairs with 'than' ('Hardly/Scarcely' pair with 'when')."
        },
        {
          id: 'conj_a2',
          question: 'The economic forecast remains grim; ___, emerging green tech sectors show remarkable resilience.',
          options: ['notwithstanding', 'conversely', 'furthermore', 'thereby'],
          correctIndex: 1,
          explanation: "'Conversely' introduces an idea that forms a sharp, illuminating contrast to the previous assertion."
        },
        {
          id: 'conj_a3',
          question: 'Intricate ___ the mathematical formula seemed, the student solved it in five minutes.',
          options: ['as', 'though as', 'however', 'since'],
          correctIndex: 0,
          explanation: "Inverted concession structure: 'Adjective + as/though + subject + verb' ('Intricate as the formula seemed')."
        },
        {
          id: 'conj_a4',
          question: 'The merger will go ahead, ___ objections from regulatory antitrust authorities.',
          options: ['notwithstanding', 'inasmuch as', 'whereas', 'albeit'],
          correctIndex: 0,
          explanation: "'Notwithstanding' is a formal preposition meaning 'in spite of'."
        },
        {
          id: 'conj_a5',
          question: 'The committee approved the budget, ___ with substantial reservations regarding contingency funds.',
          options: ['albeit', 'whereas', 'inasmuch', 'lest'],
          correctIndex: 0,
          explanation: "'Albeit' means 'though' or 'even though' and introduces a concession without a full clause."
        }
      ]
    }
  },
  {
    id: 'sentence_structure',
    title: 'Sentence Structure & Syntax',
    icon: 'Layers',
    description: 'Master clauses, prevent run-on sentences, dangling modifiers, and comma splices.',
    ruleSummary: "A complete sentence requires an independent clause with a subject and predicate. Avoid joining two independent clauses with just a comma (comma splice) or nothing (run-on).",
    examples: [
      { text: 'Run-on error: She loved reading books she bought three today.', note: 'Needs period or semicolon' },
      { text: 'Correct: She loved reading books; she bought three today.', note: 'Semicolon joins independent clauses' },
      { text: 'Dangling modifier: Walking into the room, the smoke alarm sounded.', note: 'Alarm wasn’t walking' }
    ],
    levels: {
      beginner: [
        {
          id: 'ss_b1',
          question: 'Identify the complete sentence:',
          options: [
            'Because the storm was raging outside.',
            'The sun was setting behind the snowy hills.',
            'Running quickly through the park.',
            'Although she wanted to attend.'
          ],
          correctIndex: 1,
          explanation: "'The sun was setting behind the snowy hills' has an independent subject and finite verb."
        },
        {
          id: 'ss_b2',
          question: 'Which of the following is a sentence fragment?',
          options: [
            'She enjoys playing tennis on weekends.',
            'After we finished dinner at the Italian bistro.',
            'The airplane landed safely at the airport.',
            'They decided to postpone the picnic.'
          ],
          correctIndex: 1,
          explanation: "'After we finished dinner...' is a dependent clause lacking a main clause."
        },
        {
          id: 'ss_b3',
          question: 'Fix the comma splice: "I love Italian food, pasta is my absolute favorite."',
          options: [
            'I love Italian food; pasta is my absolute favorite.',
            'I love Italian food pasta is my absolute favorite.',
            'I love Italian food, because pasta is my favorite.',
            'I love Italian food and pasta is favorite.'
          ],
          correctIndex: 0,
          explanation: "Two independent clauses must be joined by a semicolon or a coordinating conjunction with a comma."
        },
        {
          id: 'ss_b4',
          question: 'What is the subject in: "Under the ancient oak tree slept the weary traveler"?',
          options: ['the ancient oak tree', 'the weary traveler', 'slept', 'under'],
          correctIndex: 1,
          explanation: "In inverted sentences, the subject ('the weary traveler') follows the verb ('slept')."
        },
        {
          id: 'ss_b5',
          question: 'Which sentence uses correct parallel structure?',
          options: [
            'She likes swimming, to jog, and cycling.',
            'She likes swimming, jogging, and cycling.',
            'She likes to swim, jogging, and cycle.',
            'She likes swim, jog, and to cycle.'
          ],
          correctIndex: 1,
          explanation: "Parallel structure requires consistent grammatical forms (all gerunds: 'swimming, jogging, and cycling')."
        }
      ],
      intermediate: [
        {
          id: 'ss_i1',
          question: 'Which sentence contains a DANGLING MODIFIER?',
          options: [
            'Having finished the assignment, the laptop was shut down by David.',
            'Having finished the assignment, David shut down his laptop.',
            'David shut down his laptop after finishing the assignment.',
            'When David finished the assignment, he shut down the laptop.'
          ],
          correctIndex: 0,
          explanation: "'Having finished the assignment' modifies the subject that follows. The laptop did not finish the assignment; David did."
        },
        {
          id: 'ss_i2',
          question: 'Select the sentence with impeccable punctuation and clause structure:',
          options: [
            'The weather was dreadful, however, we decided to proceed with the hike.',
            'The weather was dreadful; however, we decided to proceed with the hike.',
            'The weather was dreadful however we decided to proceed with the hike.',
            'The weather was dreadful: however, we decided to proceed with the hike.'
          ],
          correctIndex: 1,
          explanation: "Conjunctive adverbs ('however') joining two independent clauses require a preceding semicolon and a following comma."
        },
        {
          id: 'ss_i3',
          question: 'Which relative clause is NON-DEFINING (non-restrictive) and requires commas?',
          options: [
            'The musician who won the Grammy gave an emotional speech.',
            'My eldest brother who lives in Vancouver is an architect.',
            'My eldest brother, who lives in Vancouver, is an architect.',
            'The laptop which has a broken keyboard needs repair.'
          ],
          correctIndex: 2,
          explanation: "'My eldest brother' is already uniquely identified; the clause provides extra information and must be bracketed by commas."
        },
        {
          id: 'ss_i4',
          question: 'Correct the faulty parallelism: "The consultant was praised for his diligence, thoroughness, and because he was creative."',
          options: [
            'for his diligence, thoroughness, and creativity.',
            'for his diligence, being thorough, and creativity.',
            'for he was diligent, thorough, and creativity.',
            'for diligence, thoroughness, and creating things.'
          ],
          correctIndex: 0,
          explanation: "All three elements in the list should be parallel abstract nouns ('diligence, thoroughness, and creativity')."
        },
        {
          id: 'ss_i5',
          question: 'What is the syntactic role of the underlined phrase: "The board considered her proposal _unacceptable_"?',
          options: ['Direct Object', 'Object Complement', 'Subject Complement', 'Adverbial Adjunct'],
          correctIndex: 1,
          explanation: "'Unacceptable' describes the direct object ('her proposal') and functions as an Object Complement."
        }
      ],
      advanced: [
        {
          id: 'ss_a1',
          question: 'Which sentence correctly demonstrates fronting with negative inversion?',
          options: [
            'Under no circumstances should employees disclose confidential cryptographic keys.',
            'Under no circumstances employees should disclose confidential cryptographic keys.',
            'Under no circumstances should disclose employees confidential keys.',
            'Under no circumstances employees disclose confidential keys.'
          ],
          correctIndex: 0,
          explanation: "'Under no circumstances' requires auxiliary inversion before the subject ('should employees disclose')."
        },
        {
          id: 'ss_a2',
          question: 'Identify the absolute phrase in the sentence: "The storm having passed, the rescue crew deployed into the valley."',
          options: [
            'The storm having passed',
            'the rescue crew deployed',
            'into the valley',
            'having passed the rescue crew'
          ],
          correctIndex: 0,
          explanation: "'The storm having passed' is an absolute phrase containing a noun and a participle with no grammatical connector to the main clause."
        },
        {
          id: 'ss_a3',
          question: 'Which of the following sentences exhibits a restrictive appositive?',
          options: [
            'The acclaimed author Gabriel García Márquez pioneered magical realism.',
            'Gabriel García Márquez, the acclaimed author, pioneered magical realism.',
            'The author, an acclaimed novelist, pioneered magical realism.',
            'Pioneering magical realism, Gabriel García Márquez won the prize.'
          ],
          correctIndex: 0,
          explanation: "When an appositive is essential to identify which author is meant, commas are omitted ('The acclaimed author Gabriel García Márquez')."
        },
        {
          id: 'ss_a4',
          question: 'Identify the syntactic error: "Not only did he neglect to notify the board, but also failed to record the transaction."',
          options: [
            'Missing subject after "but also"',
            'Incorrect inversion after "Not only"',
            'Wrong tense in "failed"',
            'Unnecessary comma'
          ],
          correctIndex: 0,
          explanation: "Because the first clause had an explicit subject ('he') inverted, the second clause after 'but also' needs a parallel subject ('but he also failed')."
        },
        {
          id: 'ss_a5',
          question: 'Which sentence features a cleft sentence designed for focal emphasis?',
          options: [
            'It was the financial controller who discovered the ledger discrepancy.',
            'The financial controller discovered the ledger discrepancy.',
            'The ledger discrepancy was discovered by the financial controller.',
            'Having discovered the discrepancy, the controller notified the board.'
          ],
          correctIndex: 0,
          explanation: "'It was [X] who [Y]' is an it-cleft construction used to put pragmatic focus on X."
        }
      ]
    }
  },
  {
    id: 'common_mistakes',
    title: 'Common Grammatical Pitfalls',
    icon: 'AlertCircle',
    description: 'Master confusing homophones, who vs whom, lie vs lay, and double negatives.',
    ruleSummary: "Avoid everyday traps: its vs it's, their vs there vs they're, fewer vs less, affect vs effect, and who vs whom.",
    examples: [
      { text: "It's = It is | Its = Possessive (The cat licked its paw)", note: 'No apostrophe for possessive its' },
      { text: 'Fewer (countable items) vs Less (uncountable quantities)', note: 'Fewer coins, less money' },
      { text: 'Affect (verb) vs Effect (noun)', note: 'The policy affected the economy; the effect was immediate' }
    ],
    levels: {
      beginner: [
        {
          id: 'cm_b1',
          question: 'Select the correct word: The company announced ___ annual dividend yesterday.',
          options: ['its', "it's", 'its’', 'their'],
          correctIndex: 0,
          explanation: "Possessive pronoun for a singular company is 'its' (no apostrophe). 'It\\'s' means 'it is'."
        },
        {
          id: 'cm_b2',
          question: '___ going to arrive at the station in ten minutes.',
          options: ["They're", 'Their', 'There', 'There are'],
          correctIndex: 0,
          explanation: "'They're' is the contraction for 'they are'."
        },
        {
          id: 'cm_b3',
          question: 'You should drink ___ cups of sugary soda.',
          options: ['fewer', 'less', 'lesser', 'fewest'],
          correctIndex: 0,
          explanation: "'Cups' is countable, so use 'fewer' (use 'less' for uncountable quantities like 'less soda')."
        },
        {
          id: 'cm_b4',
          question: 'The bad weather did not ___ our travel enthusiasm.',
          options: ['affect', 'effect', 'effected', 'affects'],
          correctIndex: 0,
          explanation: "'Affect' is the verb meaning to influence; 'effect' is typically a noun."
        },
        {
          id: 'cm_b5',
          question: 'I don’t want ___ trouble with the neighbors.',
          options: ['any', 'no', 'none', 'nothing'],
          correctIndex: 0,
          explanation: "Avoid double negatives: 'don't want any' is correct, not 'don't want no'."
        }
      ],
      intermediate: [
        {
          id: 'cm_i1',
          question: 'To ___ should I address this formal inquiry letter?',
          options: ['whom', 'who', 'whose', 'whoever'],
          correctIndex: 0,
          explanation: "Following a preposition ('to'), use the objective case pronoun 'whom'."
        },
        {
          id: 'cm_i2',
          question: 'After a grueling workout, she decided to ___ down on the sofa.',
          options: ['lie', 'lay', 'laid', 'lain'],
          correctIndex: 0,
          explanation: "'Lie' (intransitive) means to recline. 'Lay' (transitive) means to place an object down."
        },
        {
          id: 'cm_i3',
          question: 'The new environmental regulations had a profound ___ on factory emissions.',
          options: ['effect', 'affect', 'affected', 'effective'],
          correctIndex: 0,
          explanation: "We need a noun following the adjective 'profound' -> 'effect'."
        },
        {
          id: 'cm_i4',
          question: 'Divide the chocolate cake evenly ___ the three children.',
          options: ['among', 'between', 'amidst', 'within'],
          correctIndex: 0,
          explanation: "'Among' is generally used for distribution between three or more individuals."
        },
        {
          id: 'cm_i5',
          question: 'She worked ___ harder than anyone else on the research team.',
          options: ['much', 'more', 'very', 'most'],
          correctIndex: 0,
          explanation: "Use 'much' or 'far' to intensify a comparative adjective ('much harder'), not 'more harder' or 'very harder'."
        }
      ],
      advanced: [
        {
          id: 'cm_a1',
          question: 'He is the diplomat ___ the prime minister believes will negotiate the treaty successfully.',
          options: ['who', 'whom', 'whose', 'which'],
          correctIndex: 0,
          explanation: "'Who' is the subject of the clause 'will negotiate the treaty successfully'. The parenthetical 'the prime minister believes' does not change the case to objective."
        },
        {
          id: 'cm_a2',
          question: 'The archaeological relics have ___ undisturbed beneath the sediment for centuries.',
          options: ['lain', 'laid', 'lay', 'lied'],
          correctIndex: 0,
          explanation: "The past participle of the intransitive verb 'lie' (to rest/recline) is 'lain'."
        },
        {
          id: 'cm_a3',
          question: 'The CEO was ___ to accept the hostile takeover bid.',
          options: ['loath', 'loathe', 'loathing', 'loathed'],
          correctIndex: 0,
          explanation: "'Loath' (adjective) means reluctant or unwilling. 'Loathe' (verb) means to detest."
        },
        {
          id: 'cm_a4',
          question: 'Her critique was ___ on facts rather than subjective impressions.',
          options: ['based', 'grounded', 'centered around', 'revolving on'],
          correctIndex: 0,
          explanation: "'Based on' is the precise idiom. (Note: 'centered around' is often considered a redundant colloquialism; standard English prefers 'centered on')."
        },
        {
          id: 'cm_a5',
          question: 'The legal team was concerned with the ___ of the defendant’s confession.',
          options: ['admissibility', 'admittance', 'admission', 'admitting'],
          correctIndex: 0,
          explanation: "'Admissibility' specifically refers to whether evidence is legally allowable in a court of law."
        }
      ]
    }
  }
];
