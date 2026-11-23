/**
 * vocabularyData.js
 * Curated vocabulary catalog spanning A1 through C2
 * Words include phonetic pronunciation, definitions, CEFR tags, example sentences, synonyms, and antonyms.
 * Includes deterministic "Word of the Day" algorithm.
 */

export const VOCABULARY_CATALOG = [
  {
    id: 'v_articulate',
    word: 'Articulate',
    phonetic: '/ɑːrˈtɪkjələt/',
    pos: 'adjective / verb',
    cefr: 'C1',
    meaning: 'Able to express thoughts and ideas clearly and effectively in speech or writing.',
    example: 'She gave an articulate and persuasive presentation to the executive board.',
    collocations: ['articulate speaker', 'articulate argument', 'highly articulate'],
    synonyms: ['eloquent', 'coherent', 'fluent', 'lucid'],
    antonyms: ['inarticulate', 'hesitant', 'unclear', 'muffled']
  },
  {
    id: 'v_resilient',
    word: 'Resilient',
    phonetic: '/rɪˈzɪliənt/',
    pos: 'adjective',
    cefr: 'B2',
    meaning: 'Able to recover quickly from difficulties, setbacks, or misfortune.',
    example: 'Despite the economic crisis, the tech sector proved remarkably resilient.',
    collocations: ['resilient economy', 'resilient personality', 'highly resilient'],
    synonyms: ['adaptable', 'tenacious', 'buoyant', 'robust'],
    antonyms: ['fragile', 'vulnerable', 'brittle', 'delicate']
  },
  {
    id: 'v_pragmatic',
    word: 'Pragmatic',
    phonetic: '/præɡˈmætɪk/',
    pos: 'adjective',
    cefr: 'B2',
    meaning: 'Dealing with matters sensibly and realistically, based on practical considerations rather than theoretical ideals.',
    example: 'We must adopt a pragmatic approach to resolve this complex diplomatic dispute.',
    collocations: ['pragmatic approach', 'pragmatic solution', 'pragmatic policy'],
    synonyms: ['practical', 'realistic', 'sensible', 'hard-headed'],
    antonyms: ['idealistic', 'impractical', 'utopian', 'dogmatic']
  },
  {
    id: 'v_meticulous',
    word: 'Meticulous',
    phonetic: '/məˈtɪkjələs/',
    pos: 'adjective',
    cefr: 'C1',
    meaning: 'Showing great attention to detail; very careful and precise.',
    example: 'The forensic audit required meticulous examination of every individual receipt.',
    collocations: ['meticulous attention to detail', 'meticulous research', 'meticulously planned'],
    synonyms: ['diligent', 'scrupulous', 'painstaking', 'rigorous'],
    antonyms: ['careless', 'sloppy', 'negligent', 'cursory']
  },
  {
    id: 'v_ubiquitous',
    word: 'Ubiquitous',
    phonetic: '/juːˈbɪkwɪtəs/',
    pos: 'adjective',
    cefr: 'C2',
    meaning: 'Present, appearing, or found everywhere at the same time.',
    example: 'Smartphones and wireless internet have become ubiquitous in modern urban society.',
    collocations: ['ubiquitous presence', 'ubiquitous technology', 'seemingly ubiquitous'],
    synonyms: ['omnipresent', 'pervasive', 'universal', 'everywhere'],
    antonyms: ['rare', 'scarce', 'isolated', 'uncommon']
  },
  {
    id: 'v_eloquent',
    word: 'Eloquent',
    phonetic: '/ˈeləkwənt/',
    pos: 'adjective',
    cefr: 'B2',
    meaning: 'Fluent or persuasive in speaking or writing, conveying deep emotion gracefully.',
    example: 'His eloquent tribute moved the entire audience to tears.',
    collocations: ['eloquent speech', 'eloquent testimony', 'eloquently expressed'],
    synonyms: ['expressive', 'poignant', 'persuasive', 'silver-tongued'],
    antonyms: ['inarticulate', 'clumsy', 'tongue-tied']
  },
  {
    id: 'v_scrutinize',
    word: 'Scrutinize',
    phonetic: '/ˈskruːtənaɪz/',
    pos: 'verb',
    cefr: 'C1',
    meaning: 'To examine or inspect something closely and thoroughly.',
    example: 'Regulatory authorities will carefully scrutinize the terms of the proposed acquisition.',
    collocations: ['scrutinize documents', 'closely scrutinize', 'scrutinize data'],
    synonyms: ['examine', 'inspect', 'dissect', 'audit'],
    antonyms: ['glance', 'ignore', 'skim', 'overlook']
  },
  {
    id: 'v_ambiguous',
    word: 'Ambiguous',
    phonetic: '/æmˈbɪɡjuəs/',
    pos: 'adjective',
    cefr: 'B2',
    meaning: 'Open to more than one interpretation; having a double or unclear meaning.',
    example: 'The contract clauses were intentionally ambiguous to give both parties flexibility.',
    collocations: ['ambiguous statement', 'ambiguous wording', 'highly ambiguous'],
    synonyms: ['equivocal', 'vague', 'obscure', 'enigmatic'],
    antonyms: ['clear', 'lucid', 'unambiguous', 'explicit']
  },
  {
    id: 'v_tenacious',
    word: 'Tenacious',
    phonetic: '/təˈneɪʃəs/',
    pos: 'adjective',
    cefr: 'C1',
    meaning: 'Tending to keep a firm hold of something; persistent and determined.',
    example: 'Her tenacious pursuit of the truth uncovered widespread financial malfeasance.',
    collocations: ['tenacious grip', 'tenacious effort', 'tenacious journalist'],
    synonyms: ['persistent', 'resolute', 'steadfast', 'dogged'],
    antonyms: ['irresolute', 'yielding', 'fickle', 'weak']
  },
  {
    id: 'v_concise',
    word: 'Concise',
    phonetic: '/kənˈsaɪs/',
    pos: 'adjective',
    cefr: 'B1',
    meaning: 'Giving a lot of information clearly and in a few words; brief but comprehensive.',
    example: 'Please draft a concise summary of the quarterly financial statement.',
    collocations: ['concise summary', 'clear and concise', 'concise explanation'],
    synonyms: ['succinct', 'pithy', 'terse', 'compact'],
    antonyms: ['verbose', 'wordy', 'prolix', 'rambling']
  },
  {
    id: 'v_proficient',
    word: 'Proficient',
    phonetic: '/prəˈfɪʃnt/',
    pos: 'adjective',
    cefr: 'B1',
    meaning: 'Competent or skilled in doing or using something.',
    example: 'He is proficient in both Spanish and German business communications.',
    collocations: ['proficient speaker', 'highly proficient', 'proficient user'],
    synonyms: ['skilled', 'adept', 'competent', 'capable'],
    antonyms: ['incompetent', 'inept', 'amateurish']
  },
  {
    id: 'v_ephemeral',
    word: 'Ephemeral',
    phonetic: '/ɪˈfemərəl/',
    pos: 'adjective',
    cefr: 'C2',
    meaning: 'Lasting for a very short time; transitory and fleeting.',
    example: 'Viral internet fame is often ephemeral, vanishing within a few weeks.',
    collocations: ['ephemeral nature', 'ephemeral pleasure', 'ephemeral glory'],
    synonyms: ['fleeting', 'transitory', 'momentary', 'evanescent'],
    antonyms: ['permanent', 'enduring', 'eternal', 'perpetual']
  }
];

/**
 * Returns today's deterministic Word of the Day
 */
export function getWordOfTheDay() {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const index = dayOfYear % VOCABULARY_CATALOG.length;
  return VOCABULARY_CATALOG[index];
}

