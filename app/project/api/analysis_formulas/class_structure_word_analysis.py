import operator
import os


class FullAnalysis:

    def __init__(self, incoming_text):
        self.text = incoming_text
        self.all_word_collection = []
        self.allWord_dirty_collection = []
        self.vowels = ('a', 'e', 'o', 'e', 'i', 'y')
        self.consonants = ('b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n',
                                'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z')
        self.punctuation_list = (',', ':', ';', '!', '?', ')', '(', ']', '\\',
                                 '”', '[', '{', '}', '"', '\'', '%', '“', '’', '—',
                                 '*', '$', '=')
        self.word = ''
        self.c = ''
        # self.WC = False
        self.sentence = 1
        self.paragraph = 1
        # self.prevc = False
        self.a = 0
        self.ellipsis_word = ''
        self.period_word = ''
        self.paragraphWord = ''

        self.sum_words = 0
        self.word_dictionary = {}
        self.cleaned_dictionary = {}
        self.sorted_dictionary = []
        self.common_words = []
        self.common_words = ['the', 'and', 'she', 'he', 'was', 'a', 'her', 'you', 'that', 'of', 'it',
                             'for', 'him', 'his', 'in', 'i', 'with', 'up', 'at', 'this', 'what', 'had', 'said', 'on',
                             'but', 'be', 'not', 'have', 'from', 'were', 'is', 'as', 'your', 'now', 'out', 'no',
                             'which', 'onto', 'who', 'there', 'into', 'then', 'so', 'do', 'after', 'them', 'if',
                             'they', 'how', 'to', 'did', 'like', 'are', 'or', 'me', 'by', 'an', 'been', 'an', '-', '',
                             'its', 'their', 'also']
        self.dale_chall_number = 0
        self.adjust_score = 0
        self.complex_words = []
        self.ratio_complex_normal = 1
        self.dale_chall_number = 0
        self.adjust_score = 1
        self.dale_chall_word_list = ['here', 'be', 'four', 'words']
        self.dale_chall_word_array = []
        self.allWord_collection = []
        self.dale_chall_word_list = []
        self.word = ''
        self.c = ''
        self.dir_path = os.path.dirname(os.path.realpath(__file__))
        self.dale_chall_file = os.path.join(self.dir_path, 'DaleChall_wordList.txt')

    def dale_chall_pullwords(self):

        print("Starting Dale-Chall list construction...")

        with open(self.dale_chall_file) as DC_List:
            while True:
                self.c = DC_List.read(1)
                if self.c != " ":
                    # Add a "in punctuation_list" if you cannot separat punctuation marks in the file
                    self.word = self.word + self.c
                if self.c == ' ':
                    if self.word not in self.dale_chall_word_list:
                        self.dale_chall_word_list.append(self.word.lower())
                        self.word = ''
                    else:
                        self.word = ''
                if not self.c:
                    self.word = ''
                    print("\tDale-Chall word list constructed")
                    break
        return self.dale_chall_word_list

    # Returns a massive array of all words in the incoming_text
    def word_counting(self):

        if self.all_word_collection:
            return
        self.word = ''
        for self.c in self.text:
            try:
                if self.c == '\u2009—':
                    self.c = ' '
                if self.c != " " and self.c != "	" and self.c != " " and self.c not in self.punctuation_list:
                    self.word = self.word + self.c
                if self.c == ' ' or self.c == '“' or self.c == '‘' or self.c == '	' or self.c == '—':
                    if self.word != '“' and self.word != '‘':
                        self.allWord_dirty_collection.append(self.word)
                    self.word = ''
                if self.c == ' ' and self.a != self.sentence:
                    self.allWord_dirty_collection.append(self.word)
                    self.word = ''
                    self.a = self.a + 1
                    # self.prev = False
                if not self.c:
                    self.allWord_dirty_collection.append(self.word)
                    break
            except UnicodeDecodeError as e:
                self.allWord_dirty_collection.append(self.word)
                self.word = ''

                print("Unicode error: One of the characters is not " +
                      "recognized by Python: " + str(e))
                if self.c == ' ':
                    self.allWord_dirty_collection.append(self.word)
                    self.word = ''
        self.allWord_dirty_collection.append(self.word)
        for word in self.allWord_dirty_collection:
            if '\n' in word:
                self.paragraphWord = word.replace("\n", "")
                self.all_word_collection.append(self.paragraphWord.lower())
                self.allWord_dirty_collection.remove(word)
                self.paragraph = self.paragraph + 1
            if word == '':
                self.allWord_dirty_collection.remove(word)
        for word in self.allWord_dirty_collection:
            self.ellipsis_word = word.replace("...", ".")
            self.all_word_collection.append(self.ellipsis_word.lower())

        for word in self.all_word_collection:
            if '.' in word:
                self.period_word = word.replace('.', "")
                self.all_word_collection.remove(word)
                self.all_word_collection.append(self.period_word)
                self.sentence = self.sentence + 1

        return self.all_word_collection

    # Returns a dictionary of all words you used as keys, their frequencies as values
    def word_analysis(self):
        if not self.all_word_collection:
            self.word_counting()
        for word in self.all_word_collection:
            if word not in self.word_dictionary:
                self.word_dictionary[word] = 1
            else:
                self.word_dictionary[word] += 1
        self.sorted_dictionary = sorted(self.word_dictionary.items(), key=operator.itemgetter(1), reverse=True)

        for word in self.sorted_dictionary:
            if word[0] not in self.common_words:
                self.cleaned_dictionary[word[0]] = word[1]
            self.sum_words += word[1]
        return self.cleaned_dictionary

    # Returns the length of the dictionary from word_analysis
    def unique_words(self):
        if self.cleaned_dictionary == {}:
            self.word_analysis()
        return len(self.cleaned_dictionary)

    # Returns the length of your array from word_counting.
    def word_count(self):
        if not self.all_word_collection:
            self.word_counting()
        return len(self.all_word_collection)

    # Returns your dale-chall readability score (float)
    def dale_chall_analysis(self):

        if not self.all_word_collection:
            self.word_counting()
        # print("Starting Dale-Chall list construction...")
        for word in self.all_word_collection:
            if word not in self.dale_chall_word_list:
                self.complex_words.append(word)
        # print("\tThere are " + str(len(self.complex_words)) + " words that are" +
        #       " not in the Dale-Chall wordlist.\n")
        try:
            self.ratio_complex_normal = len(self.complex_words) / len(self.all_word_collection)
        except ():
            self.ratio_complex_normal = 1
        self.adjust_score = self.ratio_complex_normal * (3.6365 / 0.60)

        if self.adjust_score <= 0.05:
            self.adjust_score = 0
        self.dale_chall_number = ((0.1579 * 100 * self.ratio_complex_normal) +
                                  0.0496 * len(self.all_word_collection) / self.sentence) + self.adjust_score
        # print(f"{str(round(self.ratio_complex_normal*100))} % of words are not in the Dale-Chall word list.\n")

        return round(self.dale_chall_number, 2)
