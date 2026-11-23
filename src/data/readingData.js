/**
 * readingData.js
 * Reading & Comprehension passages across Beginner, Intermediate, and Advanced tiers.
 * Topics include Everyday Life, Workplace, Science & Technology, and Literature.
 * Includes highlighted vocabulary definitions, comprehension MCQs, and short answer prompts.
 */

export const READING_PASSAGES = [
  {
    id: 'read_1',
    title: 'The Art of Sustainable Urban Gardening',
    level: 'Beginner',
    category: 'Everyday & Lifestyle',
    readTime: '3 min read',
    content: `In modern cities around the world, concrete balconies and tiny rooftops are transforming into lush green sanctuaries. Urban gardening is more than just an aesthetic hobby; it is a movement that brings nature back to metropolitan lives.

People who live in apartments often believe they lack the space to grow their own food. However, container gardening and vertical planters make it possible to cultivate fresh herbs, crisp cherry tomatoes, and aromatic strawberries in very small spaces. A simple south-facing window can provide enough sunlight for basil, mint, and parsley to flourish throughout the spring and summer.

Beyond providing fresh ingredients, gardening provides significant mental health benefits. Tending to plants after a long day of screen time lowers stress levels and fosters a sense of accomplishment. When city dwellers harvest their first homegrown tomato, they reconnect with the natural rhythms of life.`,
    vocabulary: [
      { word: 'sanctuary', meaning: 'A place of safety, peace, or refuge.' },
      { word: 'cultivate', meaning: 'To prepare and use land for crops, or to grow plants.' },
      { word: 'flourish', meaning: 'To grow or develop in a healthy, vigorous way.' },
      { word: 'rhythm', meaning: 'A strong, regular repeated pattern of movement or sound.' }
    ],
    questions: [
      {
        id: 'rq_1_1',
        question: 'What is the main reason apartment dwellers initially hesitate to garden?',
        options: [
          'They believe they lack adequate space.',
          'They do not like the taste of home-grown herbs.',
          'They find plants too expensive to purchase.',
          'They have no access to water.'
        ],
        correctIndex: 0,
        explanation: 'The passage explicitly notes: "People who live in apartments often believe they lack the space to grow their own food."'
      },
      {
        id: 'rq_1_2',
        question: 'Which herbs are mentioned as suitable for a sunny south-facing window?',
        options: [
          'Rosemary, thyme, and oregano',
          'Basil, mint, and parsley',
          'Cilantro, chives, and dill',
          'Sage, lavender, and lemongrass'
        ],
        correctIndex: 1,
        explanation: 'The text specifically mentions "enough sunlight for basil, mint, and parsley to flourish".'
      },
      {
        id: 'rq_1_3',
        question: 'According to the author, what psychological benefit does gardening provide?',
        options: [
          'It eliminates the need for physical exercise.',
          'It reduces stress and gives a sense of accomplishment after screen time.',
          'It helps people sleep twelve hours each night.',
          'It encourages people to move to rural villages.'
        ],
        correctIndex: 1,
        explanation: 'The passage states that caring for plants "lowers stress levels and fosters a sense of accomplishment".'
      }
    ]
  },
  {
    id: 'read_2',
    title: 'Navigating Cross-Cultural Communication in Remote Teams',
    level: 'Intermediate',
    category: 'Workplace & Professional',
    readTime: '4 min read',
    content: `The rapid rise of global remote work has created multinational teams that collaborate seamlessly across continents and time zones. Yet, while high-speed internet and instant messaging tools solve logistical hurdles, cultural nuances remain one of the most subtle challenges modern professionals encounter.

Different cultures maintain distinct approaches to directness. In low-context cultures, such as the United States, Germany, or the Netherlands, communication is typically explicit and literal. Feedback is direct: if a proposal has flaws, colleagues will outline them concisely. Conversely, in high-context cultures across East Asia and parts of Latin America, communication relies heavily on implicit cues, background context, and social harmony. In these environments, disagreement is frequently softened or phrased as an open question to preserve interpersonal trust.

When these communication paradigms collide on asynchronous chat platforms, misunderstandings can easily arise. A succinct critique that seems constructive to a German engineer might feel abrasive to a Japanese designer. Similarly, polite hedging from an Asian colleague could be misinterpreted as enthusiastic agreement by a North American manager.

Successful international organizations overcome this friction by establishing explicit team norms. Rather than assuming their preferred communication style is universal, inclusive teams cultivate intentional empathy, clarify expectations upfront, and default to generous interpretations when tone feels ambiguous.`,
    vocabulary: [
      { word: 'logistical', meaning: 'Relating to the organization and execution of a complex plan.' },
      { word: 'implicit', meaning: 'Implied though not plainly expressed; understood indirectly.' },
      { word: 'hedging', meaning: 'Using cautious or ambiguous language to soften a statement.' },
      { word: 'abrasive', meaning: 'Showing little concern for the feelings of others; harsh.' }
    ],
    questions: [
      {
        id: 'rq_2_1',
        question: 'What characterizes communication in "low-context" cultures?',
        options: [
          'Relying primarily on body language and unspoken social cues.',
          'Direct, explicit, and literal expression of ideas and feedback.',
          'Avoiding disagreement at all costs to preserve harmony.',
          'Communicating only through formal written letters.'
        ],
        correctIndex: 1,
        explanation: 'In low-context cultures, communication is typically explicit, concise, and literal.'
      },
      {
        id: 'rq_2_2',
        question: 'How might a North American manager misinterpret polite hedging from a high-context colleague?',
        options: [
          'As a sign of aggressive confrontation.',
          'As an indication of poor language fluency.',
          'As enthusiastic agreement rather than polite disagreement.',
          'As an urgent request for immediate promotion.'
        ],
        correctIndex: 2,
        explanation: 'The text notes: "polite hedging from an Asian colleague could be misinterpreted as enthusiastic agreement by a North American manager."'
      },
      {
        id: 'rq_2_3',
        question: 'What strategy do successful international organizations employ to mitigate misunderstandings?',
        options: [
          'Mandating that all team members adopt identical native accents.',
          'Restricting cross-cultural interactions to phone calls only.',
          'Establishing explicit team norms and cultivating intentional empathy.',
          'Eliminating asynchronous chat tools entirely.'
        ],
        correctIndex: 2,
        explanation: 'They establish team norms, clarify expectations upfront, and practice intentional empathy.'
      }
    ]
  },
  {
    id: 'read_3',
    title: 'The Neurological Foundations of Second Language Acquisition',
    level: 'Advanced',
    category: 'Science & Linguistics',
    readTime: '5 min read',
    content: `For decades, popular linguistic dogma posited that the human brain possesses a strict "critical period" for language acquisition, beyond which achieving native fluency becomes virtually impossible. According to this traditional hypothesis, the neuroplasticity that allows young children to absorb phonemes and morphological rules without conscious effort rapidly diminishes post-puberty.

Recent neuroimaging breakthroughs, however, have painted a far more nuanced picture. While it is true that adults rarely attain unaccented phonological mimicry with the effortless rapidity of toddlers, adult learners possess cognitive architectures that are vastly superior for structural pattern recognition. Adults harness sophisticated metacognitive strategies, explicit analytical reasoning, and extensive semantic frameworks forged in their native tongue to accelerate grammar comprehension.

Functional magnetic resonance imaging (fMRI) studies reveal that bilingual brains exhibit denser gray matter in the inferior parietal cortex. Furthermore, navigating two or more linguistic systems acts as an intense cognitive workout for executive control mechanisms. The prefrontal cortex must continually suppress the non-active language while retrieving appropriate lexical items, effectively inoculating the brain against cognitive decline and delaying the symptomatic onset of dementia.

Ultimately, the dichotomy between childhood and adult language acquisition is not one of absolute capability, but of learning methodology. While children learn through immersive social contagion, adults thrive through deliberate practice, spaced repetition, and comprehensible input tailored to their intellectual maturity.`,
    vocabulary: [
      { word: 'neuroplasticity', meaning: "The brain's ability to reorganize itself by forming new neural connections." },
      { word: 'metacognitive', meaning: "Awareness and understanding of one's own thought and learning processes." },
      { word: 'dichotomy', meaning: 'A division or contrast between two things represented as opposed or entirely different.' },
      { word: 'contagion', meaning: 'The spontaneous transmission of attitudes, behaviors, or habits through contact.' }
    ],
    questions: [
      {
        id: 'rq_3_1',
        question: 'What did the traditional "critical period" hypothesis assert about second language acquisition?',
        options: [
          'Adults learn grammar faster than vocabulary.',
          'Achieving native-level proficiency becomes virtually impossible after puberty due to declining neuroplasticity.',
          'Children require formal grammatical instruction to speak coherently.',
          'Brain lateralization prevents bilingualism in adulthood.'
        ],
        correctIndex: 1,
        explanation: 'The critical period hypothesis claimed that after puberty, declining neuroplasticity renders native fluency near-unattainable.'
      },
      {
        id: 'rq_3_2',
        question: 'According to fMRI research, what cognitive benefit is observed in bilingual brains?',
        options: [
          'Immediate photographic memory for visual information.',
          'Denser gray matter in the inferior parietal cortex and strengthened executive control.',
          'Complete immunity from physical headaches and stress.',
          'Permanent elimination of the need for vocabulary review.'
        ],
        correctIndex: 1,
        explanation: 'The passage highlights denser gray matter in the inferior parietal cortex and reinforced executive control.'
      },
      {
        id: 'rq_3_3',
        question: 'What is the primary cognitive advantage adult learners possess over young children?',
        options: [
          'Superior phonemic imitation and accent-free pronunciation.',
          'Metacognitive strategies, explicit analytical reasoning, and existing semantic frameworks.',
          'Greater physical auditory sensitivity in noisy rooms.',
          'Higher innate tolerance for memorizing lists without context.'
        ],
        correctIndex: 1,
        explanation: 'Adults possess metacognitive strategies, analytical pattern recognition, and robust semantic foundations.'
      }
    ]
  }
];
