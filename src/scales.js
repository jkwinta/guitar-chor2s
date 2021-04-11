export const scales = {
    // pentatonic scales
    'MINOR PENTATONIC': [
        'ROOT', 'MINOR 3RD', 'PERFECT 4TH', 'PERFECT 5TH', 'MINOR 7TH'],
    'MAJOR PENTATONIC': [
        'ROOT', 'MAJOR 2ND', 'MAJOR 3RD', 'PERFECT 5TH', 'MAJOR 6TH'],
    'SUSPENDED': [
        'ROOT', 'MAJOR 2ND', 'PERFECT 4TH', 'PERFECT 5TH', 'MINOR 7TH'],
    'BLUES MINOR': [
        'ROOT', 'MINOR 3RD', 'PERFECT 4TH', 'MINOR 6TH', 'MINOR 7TH'],
    'BLUES MAJOR': [
        'ROOT', 'MAJOR 2ND', 'PERFECT 4TH', 'PERFECT 5TH', 'MAJOR 6TH'],

    // heptatonic scales
    'MAJOR': ['ROOT', 'MAJOR 2ND', 'MAJOR 3RD', 'PERFECT 4TH',
              'PERFECT 5TH', 'MAJOR 6TH', 'MAJOR 7TH'],
    'MINOR': ['ROOT', 'MAJOR 2ND', 'MINOR 3RD', 'PERFECT 4TH',
              'PERFECT 5TH', 'MINOR 6TH', 'MINOR 7TH'],
    'HARMONIC MINOR': ['ROOT', 'MAJOR 2ND', 'MINOR 3RD', 'PERFECT 4TH',
                       'PERFECT 5TH', 'MINOR 6TH', 'MAJOR 7TH'],
    'MELODIC MINOR': ['ROOT', 'MAJOR 2ND', 'MINOR 3RD', 'PERFECT 4TH',
                      'PERFECT 5TH', 'MAJOR 6TH', 'MAJOR 7TH'],
    // heptatonic modes
    'LYDIAN': ['ROOT', 'MAJOR 2ND', 'MAJOR 3RD', 'AUGMENTED 4TH',
               'PERFECT 5TH', 'MAJOR 6TH', 'MAJOR 7TH'],
    'MIXOLYDIAN': ['ROOT', 'MAJOR 2ND', 'MAJOR 3RD', 'PERFECT 4TH',
                   'PERFECT 5TH', 'MAJOR 6TH', 'MINOR 7TH'],
    'DORIAN': ['ROOT', 'MAJOR 2ND', 'MINOR 3RD', 'PERFECT 4TH',
               'PERFECT 5TH', 'MAJOR 6TH', 'MINOR 7TH'],
    'PHRYGIAN': ['ROOT', 'MINOR 2ND', 'MINOR 3RD', 'PERFECT 4TH',
                 'PERFECT 5TH', 'MINOR 6TH', 'MINOR 7TH'],
    'LOCRIAN': ['ROOT', 'MINOR 2ND', 'MINOR 3RD', 'PERFECT 4TH',
                'DIMINISHED 5TH', 'MINOR 6TH', 'MINOR 7TH'],

    'FREYGISH': ['ROOT', 'MINOR 2ND', 'MAJOR 3RD', 'PERFECT 4TH',
                 'PERFECT 5TH', 'MINOR 6TH', 'MINOR 7TH'],
    'ALTERED DORIAN': ['ROOT', 'MAJOR 2ND', 'MINOR 3RD', 'AUGMENTED 4TH',
                       'PERFECT 5TH', 'MAJOR 6TH', 'MINOR 7TH'],

    // octatonic scales
    'WHOLE-HALF DIMINISHED': ['ROOT', 'MAJOR 2ND', 'MINOR 3RD',
                              'PERFECT 4TH', 'AUGMENTED 4TH', 'AUGMENTED 5TH',
                              'MAJOR 6TH', 'MAJOR 7TH'],
    'HALF-WHOLE DIMINISHED': ['ROOT', 'MINOR 2ND', 'MINOR 3RD', 'MAJOR 3RD',
                              'AUGMENTED 4TH', 'PERFECT 5TH',
                              'MAJOR 6TH', 'MINOR 7TH'],
    // bebop (add modes?)
    'BEBOP DOMINANT': ['ROOT', 'MAJOR 2ND', 'MAJOR 3RD', 'PERFECT 4TH',
                       'PERFECT 5TH', 'MAJOR 6TH', 'MINOR 7TH', 'MAJOR 7TH'],
    'BEBOP MAJOR': ['ROOT', 'MAJOR 2ND', 'MAJOR 3RD', 'PERFECT 4TH',
                    'PERFECT 5TH', 'AUGMENTED 5TH', 'MAJOR 6TH', 'MAJOR 7TH'],

    // Blues scales
    'BLUES HEXATONIC': ['ROOT', 'MINOR 3RD', 'PERFECT 4TH', 'DIMINISHED 5TH',
                        'PERFECT 5TH', 'MINOR 7TH'],
    'BLUES HEPTATONIC': ['ROOT', 'MAJOR 2ND', 'MINOR 3RD', 'PERFECT 4TH',
                         'DIMINISHED 5TH', 'MAJOR 6TH', 'MINOR 7TH'],
    'BLUES NONATONIC': ['ROOT', 'MAJOR 2ND', 'MINOR 3RD', 'MAJOR 3RD',
                        'PERFECT 4TH', 'PERFECT 5TH',
                        'MAJOR 6TH', 'MINOR 7TH', 'MAJOR 7TH'],

}

export const scale_aliases = {
    'SUSPENDED': ['EGYPTIAN'],
    'BLUES MINOR': ['MAN GONG'],
    'BLUES MAJOR': ['RITSUSEN', 'YO'],
    'MAJOR': ['IONIAN'],
    'MINOR': ['AEOLIAN'],

}

// TODO: verify relative modality shifts of scales:
const heptatonic_order = ['IONIAN', 'DORIAN', 'PHRYGIAN', 'LYDIAN', 'MIXOLYDIAN',
                    'AEOLIAN', 'LOCRIAN', ]
