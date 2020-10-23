// Copyright 2020, The Tremor Team
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/*
Language: tremor-script
Author: Darach Ennis <darach@gmail.com>
Description: Tremor is an event processing system with embedded domain languages. Tremor-script is the core language DSL.
Website: https://www.tremor.rs
*/

var module = module ? module: {};

function defineTremorGrammar(hljs) {
  const BRACED_SUBST = {
    className: 'subst',
    subLanguage: 'tremor',
    variants: [{
      begin: '\\{',
      end: '}'
    }],
    keywords: 'true false null this is new super',
  };

  const KEYWORDS = {
    keyword:
      'emit drop const let for match of case when default end patch insert update erase move copy present absent' +
      ' merge fn use mod recur with as intrinsic',
    meta:
      'event args state window group',
    literal:
      'false true null'
  };

  const STRING = {
    className: 'string',
    variants: [
      {
        begin: '"""',
        end: '"""',
        contains: [hljs.BACKSLASH_ESCAPE, BRACED_SUBST]
      },
      {
        begin: '"',
        end: '"',
        illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE, BRACED_SUBST]
      },
    ]
  };
  BRACED_SUBST.contains = [
    hljs.C_NUMBER_MODE, STRING
  ];

  var PRIMED_IDENT = {
    className: 'string',
    begin: '`', end: '`',
    contains: [hljs.BACKSLASH_ESCAPE]
  };

  var DOLLAR_IDENT = {
    className: 'meta',
    begin: '\\$[a-zA-Z0-9]+'
  };

  var SIGNIFICANT_OPERATORS = {
    className: 'built_in',
    begin: "(=>)|(~=)|~|\\|"
  };

  return {
    name: "tremor-script",
    aliases: ["tremor"],
    keywords: KEYWORDS,
    case_insensitive: true,
    contains: [
      STRING,
      PRIMED_IDENT,
      DOLLAR_IDENT,
      SIGNIFICANT_OPERATORS,
      hljs.NUMBER_MODE,
      hljs.COMMENT(
        '#+',
        '$', {
          contains: [{
            begin: '.',
            subLanguage: 'markdown',
            end: '$',
            relevance:0
          }]
        }
      ),
    ]
  };
}

export default defineTremorGrammar;
